import { getImageData } from "./image.js"
import { Particle } from "./particle.js"

class Effect {
  constructor({ canvasID, imageUrl, radius = 8, gap = 16 }) {
    this.canvasID = canvasID
    this.imageUrl = imageUrl
    this.radius = Math.floor(radius)
    this.gap = Math.floor(this.radius * 2 + gap)
  }

  async init() {
    this.canvasSetup()
    await this.createParticles()
    this.draw()
  }

  canvasSetup() {
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  async createParticles() {
    // analyze the image,extract color and create the particles
    const { width, height, pixels } = await getImageData(this.imageUrl)

    // calculate the offset of the image to center it
    const image = {
      offsetX: (this.canvas.width - width) / 2,
      offsetY: (this.canvas.height - height) / 2,
    }

    // create the particles
    this.particles = []
    for (let y = 0; y < height; y += this.gap) {
      for (let x = 0; x < width; x += this.gap) {
        const index = (y * width + x) * 4
        const red = pixels[index + 0]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const alpha = pixels[index + 3] * (1 / 255)

        if (alpha > 0.5) {
          this.particles.push(
            new Particle({
              effect: this,
              radius: this.radius,
              color: { red, green, blue, alpha },
              position: {
                start: {
                  x: Math.floor(Math.random() * this.canvas.width),
                  y: Math.floor(
                    this.canvas.height - Math.random() * this.radius * 4
                  ),
                },
                origin: {
                  x: x + image.offsetX,
                  y: y + image.offsetY,
                },
                end: {
                  x: Math.floor(Math.random() * this.canvas.width),
                  y: Math.floor(Math.random() * this.radius * 4),
                },
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
