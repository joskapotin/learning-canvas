import { createImage } from "./image.js"
import { Particle } from "./particle.js"

class Effect {
  constructor({ canvasID, imageUrl, size = 16, gap = 16 }) {
    this.canvasID = canvasID
    this.imageUrl = imageUrl
    this.size = size
    this.gap = size + gap
  }

  async init() {
    this.canvasSetup()
    await this.drawImage()
    this.analyzeImage()
    this.clearCanvas()
    this.draw()
  }

  canvasSetup() {
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  async drawImage() {
    this.image = await createImage({ ctx: this.ctx, imageUrl: this.imageUrl })
  }

  analyzeImage() {
    // analyze the image,extract color and create the particles
    this.particles = []
    for (let y = 0; y < this.image.height; y += this.gap) {
      for (let x = 0; x < this.image.width; x += this.gap) {
        const index = (y * this.image.width + x) * 4
        const red = this.image.pixels[index + 0]
        const green = this.image.pixels[index + 1]
        const blue = this.image.pixels[index + 2]
        const alpha = this.image.pixels[index + 3] * (1 / 255)
        if (alpha > 0.5) {
          this.particles.push(
            new Particle({
              canvas: this.canvas,
              size: this.size,
              color: { red, green, blue, alpha },
              position: {
                x: x + this.image.offsetX,
                y: y + this.image.offsetY,
              },
            })
          )
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.particles.forEach(particle => {
      // particle.drawSquare(this.ctx)
      particle.drawCircle(this.ctx)
    })
  }

  update() {
    this.particles.forEach(particle => {
      particle.update()
      // particle.drawSquare(this.ctx)
      particle.drawCircle(this.ctx)
    })
  }
}

export { Effect }
