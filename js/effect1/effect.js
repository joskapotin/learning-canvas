import { getImageData } from "./image.js"
import { Particle } from "./particle.js"

class Effect {
  constructor({ canvasID, imageUrl, radius = 8, gap = 16, velocity = 100 }) {
    this.canvasID = canvasID
    this.imageUrl = imageUrl
    this.radius = Math.floor(radius)
    this.gap = Math.floor(this.radius * 2 + gap)
    this.velocity = velocity

    window.addEventListener("resize", () => {
      this.init()
    })
  }

  handleEvent() {
    this.canvas.addEventListener("mousedown", () => {
      const interval = setInterval(() => {
        this.clearCanvas()
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

  async init() {
    this.createCanvas()
    this.resizeCanvas()

    await this.createParticles()
    this.draw()
    this.handleEvent()
  }

  createCanvas() {
    this.canvas = document.getElementById(this.canvasID)
    this.ctx = this.canvas.getContext("2d")
  }

  resizeCanvas = () => {
    // Field width need to be a multiple of the cell size
    // we need the inner size of it's parent and the padding
    const parentWidth =
      this.canvas.parentElement.clientWidth +
      this.canvas.parentElement.style.paddingInline / 2
    const parentHeight =
      this.canvas.parentElement.clientHeight +
      this.canvas.parentElement.style.paddingBlock / 2

    this.canvas.width = Math.floor(parentWidth / this.radius) * this.radius
    this.canvas.height = Math.floor(parentHeight / this.radius) * this.radius
  }

  async createParticles() {
    // analyze the image,extract color and create the particles
    this.image = await getImageData(this.imageUrl)
    const { width, height, pixels } = this.image

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
              velocity: this.velocity,
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
