import { HSLToRGB, RGBToHSL, modulo } from "../utils.js"

class Particle {
  constructor({ canvas, size, color, position }) {
    this.originX = Math.round(position.x)
    this.originY = Math.round(position.y)
    this.x = Math.round(Math.random() * canvas.width)
    this.y = Math.round(Math.random() * canvas.height)
    this.color = { ...color, alpha: 0 }
    this.originColor = color
    this.size = size
    this.radius = this.size / 2
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.x + this.radius,
      this.y + this.radius / 2,
      this.radius,
      0,
      Math.PI * 2
    )
    // ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alpha})`
    ctx.fill()
  }

  drawSquare(ctx) {
    // ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alpha})`
  }

  shiftColor() {
    const { h, s, l } = RGBToHSL(this.color)
    this.color = {
      ...this.color,
      ...HSLToRGB({
        h: modulo(h + 5, 360),
        s,
        l,
      }),
    }
    // this.color.red = modulo(this.color.red + amount, 255)
    // this.color.green = modulo(this.color.green + amount, 255)
    // this.color.blue = modulo(this.color.blue + amount, 255)
  }

  update() {
    this.dx = Math.round(this.x - this.originX)
    this.dy = Math.round(this.y - this.originY)

    // this.shiftColor()

    if (Math.abs(this.dx) > 0) this.x -= this.dx * 0.1
    if (Math.abs(this.dy) > 0) this.y -= this.dy * 0.1

    if (this.color.alpha < 1)
      this.color.alpha = 1 / Math.abs(this.dx * this.dy) + 0.5
  }
}

export { Particle }
