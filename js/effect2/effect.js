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
    // resize canvas before initializing field
    // to get correct cell amount
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

      particle.position.x = position.x % this.width
      particle.position.y = position.y % this.height

      // find the cell the particle is in
      const x = Math.floor(position.x / this.resolution)
      const y = Math.floor(position.y / this.resolution)
      const index = y * this.field.cols + x

      // !DEBUG: check if cell exists
      if (!this.field.cells[index]) {
        console.log("y", y)
        console.log("cols", this.field.cols)
        console.log("x", x)
        console.log("index", index)
        console.log("cells", this.field.cells)
      }

      const { angle, color } = this.field.cells[index]

      // set the velocity of the particle
      particle.velocity.y = Math.cos(angle)
      particle.velocity.x = Math.sin(angle)
      particle.color = color

      // update the particle
      particle.update()
      // draw the particle
      particle.draw(this.ctx)
    })
  }
}

export { Effect }
