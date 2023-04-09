import { HSLToRGB, RGBToHSL, modulo } from "../utils.js"

class Particle {
  #position
  #color
  #size

  constructor({ canvas, size, color, position }) {
    this.#position = {
      origin: { x: Math.round(position.x), y: Math.round(position.y) },
      current: {
        x: Math.round(Math.random() * canvas.width),
        y: Math.round(Math.random() * canvas.height),
      },
    }

    this.#color = {
      origin: { ...color },
      current: { ...color, alpha: 0 },
    }

    this.#size = {
      origin: size,
      current: size,
    }
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.#position.current.x + this.#size.current * 0.5,
      this.#position.current.y + this.#size.current * 0.25,
      this.#size.current * 0.5,
      0,
      Math.PI * 2
    )
    // ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillStyle = `rgba(${this.#color.current.red}, ${
      this.#color.current.green
    }, ${this.#color.current.blue}, ${this.#color.current.alpha})`
    ctx.fill()
  }

  drawSquare(ctx) {
    // ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillRect(
      this.#position.current.x,
      this.#position.current.y,
      this.#size,
      this.#size
    )
    ctx.fillStyle = `rgba(${this.#color.current.red}, ${
      this.#color.current.green
    }, ${this.#color.current.blue}, ${this.#color.current.alpha})`
  }

  #shiftColor() {
    const { h, s, l } = RGBToHSL(this.#color.current)
    this.#color.current = {
      ...this.#color.current,
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
    this.dx = Math.round(this.#position.current.x - this.#position.origin.x)
    this.dy = Math.round(this.#position.current.y - this.#position.origin.y)

    // this.#shiftColor()

    if (Math.abs(this.dx) > 0) this.#position.current.x -= this.dx * 0.1
    if (Math.abs(this.dy) > 0) this.#position.current.y -= this.dy * 0.1

    if (this.#color.current.alpha < 1)
      this.#color.current.alpha = 1 / Math.abs(this.dx * this.dy) + 0.5
  }
}

export { Particle }
