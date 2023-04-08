import { createImage } from "./image.js"
import { Particle } from "./particle.js"

class Effect {
  constructor({ canvasID, imageUrl, size = 16 }) {
    this.canvasID = canvasID
    this.imageUrl = imageUrl
    this.size = size
    this.init()
  }

  canvasSetup() {
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  async drawImage() {
    const image = await createImage({ ctx: this.ctx, imageUrl: this.imageUrl })
    this.offsetX = image.offsetX
    this.offsetY = image.offsetY
    this.width = image.width
    this.height = image.height
    this.pixels = image.pixels
  }

  analyzeImage() {
    // analyze the image,extract color and create the particles
    const gap = this.size
    this.particles = []
    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * this.width + x) * 4
        const red = this.pixels[index + 0]
        const green = this.pixels[index + 1]
        const blue = this.pixels[index + 2]
        const alpha = this.pixels[index + 3]
        if (alpha > 128) {
          this.particles.push(
            new Particle({
              ctx: this.ctx,
              size: this.size,
              color: { red, green, blue, alpha },
              position: { x: x + this.offsetX, y: y + this.offsetY },
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
      //particle.drawSquare(ctx)
      particle.drawCircle(this.ctx)
    })
  }

  async init() {
    this.canvasSetup()
    await this.drawImage()
    this.analyzeImage()
    this.clearCanvas()
    this.draw()
  }
}

export { Effect }
