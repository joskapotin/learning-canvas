import { modulo } from "../utils.js"
import { clearCanvas, getNewCanvasSize } from "./canvas.js"
import { Field } from "./field.js"
import { Particle } from "./particle.js"

// Create particles
const createParticles = ({ particlesAmount, particleRadius, canvas }) => {
  const particles = []
  for (let i = 0; i < particlesAmount; i++) {
    particles.push(
      new Particle({
        radius: particleRadius,
        color: "white",
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
    debug = true,
  }) {
    this.canvasID = canvasID
    this.resolution = resolution
    this.particleAmount = particleAmount
    this.particleRadius = particleRadius
    this.debug = debug
    this.throttled = false

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

    this.canvas.addEventListener("mousedown", () => {
      const interval = setInterval(() => {
        this.update()
      }, 5000 / 60)
      this.canvas.addEventListener(
        "mouseup",
        () => {
          clearInterval(interval)
        },
        { once: true }
      )
    })
  }

  init() {
    this.initCanvas()
    this.initField()
    this.initParticles()

    // Draw field in debug mod
    if (this.debug) this.field.draw(this.ctx)

    // Draw particles
    this.update()
    this.initEvents()
  }

  update() {
    clearCanvas({ canvas: this.canvas, ctx: this.ctx })

    if (this.debug) this.field.draw(this.ctx)

    this.particles.forEach(particle => {
      const { position } = particle

      // wrap the particle around the canvas if it goes out of bounds
      particle.position.x = modulo(position.x, this.width)
      particle.position.y = modulo(position.y, this.height)

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

      // Update the particle
      const { angle, color, length } = this.field.cells[index]
      particle.velocity.x = Math.cos(angle) * length * 0.1
      particle.velocity.y = Math.sin(angle) * length * 0.1
      particle.color = color

      // TODO: bounce the particle off the edges of the canvas instead of wrapping
      // TODO: if wrapping, deal with the trail

      particle.update()
      particle.draw(this.ctx)
    })
  }
}

export { Effect }
