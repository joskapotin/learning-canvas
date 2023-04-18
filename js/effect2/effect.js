import { modulo } from "../utils.js"
import { getNewCanvasSize } from "./canvas.js"
import { Field } from "./field.js"
import { Particle } from "./particle.js"

// Create particles
const createParticles = ({ particlesAmount, particleRadius, canvas }) => {
  const particles = []
  for (let i = 0; i < particlesAmount; i++) {
    particles.push(
      new Particle({
        radius: particleRadius,
        color: "rgba(100, 100, 0, 0.5)",
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
      })
    )
  }
  return particles
}

class Effect {
  constructor({
    canvasID,
    resolution = 32,
    particleAmount = 100,
    particleRadius = 5,
    debug = false,
    curve = 0.5,
    zoom = 0.2,
    speed = 10,
    clear,
    controlsID,
  }) {
    this.canvasID = canvasID
    this.resolution = resolution
    this.particleAmount = particleAmount
    this.particleRadius = particleRadius
    this.debug = debug
    this.throttled = false
    this.curve = curve
    this.zoom = zoom
    this.speed = speed
    this.clear = clear
    this.controlsID = controlsID

    this.width = 0
    this.height = 0
    this.particles = []

    this.init()
  }

  initCanvas() {
    // Get canvas and context
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
    this.backgroundColor = this.canvas.style.backgroundColor
  }

  initField() {
    // Resize canvas before initializing field to get correct cell amount
    const { width, height } = getNewCanvasSize({
      canvas: this.canvas,
      resolution: this.resolution,
    })
    this.width = this.canvas.width = width
    this.height = this.canvas.height = height

    // Create field
    this.field = new Field({
      rows: this.height / this.resolution,
      cols: this.width / this.resolution,
      resolution: this.resolution,
      curve: this.curve,
      zoom: this.zoom,
    })
  }

  initParticles() {
    this.particles = createParticles({
      particlesAmount: this.particleAmount,
      particleRadius: this.particleRadius,
      canvas: this.canvas,
    })
  }

  initEvents() {
    window.addEventListener("resize", () => {
      if (this.throttled) return
      this.throttled = true
      setTimeout(() => {
        this.init()
        this.throttled = false
      }, 1000)
    })

    // CONTROLS
    const controlsUI = document.getElementById(this.controlsID)
    if (controlsUI) {
      controlsUI.addEventListener("input", e => {
        const { name, value } = e.target
        this[name] = value
        this.init()
      })
    }

    // ANIMATION
    this.canvas.addEventListener("mousedown", () => {
      const interval = setInterval(() => {
        this.update()
      }, 5)
      this.canvas.addEventListener(
        "mouseup",
        () => {
          clearInterval(interval)
        },
        { once: true }
      )
    })

    this.canvas.addEventListener("touchstart", () => {
      const interval = setInterval(() => {
        this.clearCanvas()
        this.update()
      }, 5000 / 60)
      this.canvas.addEventListener(
        "touchend",
        () => {
          clearInterval(interval)
        },
        { once: true }
      )
    })
  }

  resetParticle(particle) {
    particle.position.x = Math.random() * this.width
    particle.position.y = Math.random() * this.height
    particle.velocity.x = 0
    particle.velocity.y = 0
    particle.history = []
  }

  init() {
    this.initCanvas()
    this.initField()
    this.initParticles()
    this.initEvents()
    // * DEBUG
    if (this.debug) this.field.draw(this.ctx)

    // this.update()
  }

  update() {
    // * CLEAR
    switch (this.clear) {
      case "clear":
        this.ctx.clearRect(0, 0, this.width, this.height)
        break
      case "fade":
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        this.ctx.fillRect(0, 0, this.width, this.height)
        break
      case "background":
        this.ctx.fillStyle = this.backgroundColor
        this.ctx.fillRect(0, 0, this.width, this.height)
        break
      default:
        break
    }

    // * DEBUG
    if (this.debug) this.field.draw(this.ctx)

    // * UPDATE
    this.particles.forEach(particle => {
      const { position } = particle

      // * HANDLE BOUNDARIES
      // remove history and reset position if particle is out of bounds
      if (
        position.x < 0 ||
        position.x > this.width ||
        position.y < 0 ||
        position.y > this.height
      ) {
        this.resetParticle(particle)
      }

      // wrap the particle around the canvas
      particle.position.x = modulo(position.x, this.width)
      particle.position.y = modulo(position.y, this.height)

      // * UPDATE PARTICLE
      // get matching flow field cell index
      const x = Math.floor(position.x / this.resolution)
      const y = Math.floor(position.y / this.resolution)
      const index = y * this.field.cols + x

      // !DEBUG
      if (this.field.cells[index] === undefined) {
        console.log("DUMP START")
        console.log("index", index)
        console.log("x", x)
        console.log("y", y)
        console.log("cols", this.field.cols)
        console.log("rows", this.field.rows)
        console.log("cells", this.field.cells)
        console.log("DUMP END")
      }

      // Update the particle properties based on the flow field
      const { angle, color, length } = this.field.cells[index]
      particle.velocity.x =
        Math.cos(angle) *
        length *
        Math.random() *
        (this.speed / this.resolution)
      particle.velocity.y =
        Math.sin(angle) *
        length *
        Math.random() *
        (this.speed / this.resolution)
      particle.color = color

      // TODO: bounce the particle off the edges of the canvas instead of wrapping
      // TODO: if wrapping, deal with the trail

      particle.update()

      // * DRAW
      particle.draw(this.ctx)
    })
  }
}

export { Effect }
