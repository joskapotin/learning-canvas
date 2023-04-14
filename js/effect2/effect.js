import { clearCanvas, setNewCanvasSize } from "./canvas.js"
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
    cellSize = 32,
    particleAmount = 100,
    particleRadius = 5,
    debug = false,
  }) {
    this.canvasID = canvasID
    this.cellSize = cellSize
    this.particleAmount = particleAmount
    this.particleRadius = particleRadius
    this.debug = debug
    this.throttled = false

    this.particles = []

    this.init()
  }

  init() {
    // Get canvas and context
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
    this.backgroundColor = this.canvas.style.backgroundColor

    // Set canvas size before initializing field
    // to get correct cell amount
    setNewCanvasSize({ canvas: this.canvas, cellSize: this.cellSize })

    // Create field
    this.field = new Field({
      width: this.canvas.width,
      height: this.canvas.height,
      cellSize: this.cellSize,
    })
    if (this.debug) this.field.draw(this.ctx)

    // Create particles
    this.particles = createParticles({
      particlesAmount: this.particleAmount,
      particleRadius: this.particleRadius,
      canvas: this.canvas,
    })

    // Draw particles
    this.particles.forEach(particle => particle.draw(this.ctx))

    // Handle events
    window.addEventListener("resize", () => {
      if (this.throttled) return
      this.throttled = true
      setTimeout(() => {
        this.init()
        this.throttled = false
      }, 500)
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

  update() {
    clearCanvas({ canvas: this.canvas, ctx: this.ctx })
    // this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.debug) this.field.draw(this.ctx)

    for (let i = 0; i < this.particles.length; i++) {
      const { position } = this.particles[i]

      // loop the particles around the canvas
      if (position.x < 0) this.particles[i].position.x = this.canvas.width
      if (position.x > this.canvas.width) this.particles[i].position.x = 0
      if (position.y < 0) this.particles[i].position.y = this.canvas.height
      if (position.y > this.canvas.height) this.particles[i].position.y = 0

      // find the cell the particle is in
      const colAmount = this.canvas.width / this.cellSize
      const x = Math.floor(position.x / this.cellSize)
      const y = Math.floor(position.y / this.cellSize)
      const index = y * colAmount + x

      // get the angle of the cell
      const { angle } = this.field.cells[index]

      // set the velocity of the particle
      this.particles[i].velocity.x = Math.cos(angle) * 5
      this.particles[i].velocity.y = Math.sin(angle) * 5

      this.particles[i].update()
      this.particles[i].draw(this.ctx)
    }
  }
}

export { Effect }
