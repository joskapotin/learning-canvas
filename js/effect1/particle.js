class Particle {
  #position
  #color
  #size

  static maxDistanceOpacity = 20

  constructor({ canvas, size, color, position }) {
    this.#position = {
      origin: { x: Math.round(position.x), y: Math.round(position.y) },
      current: {
        x: Math.round(Math.random() * canvas.width),
        y: Math.round(canvas.height - Math.random() * size * 2),
      },
    }

    this.#color = {
      origin: color,
      current: color,
    }

    this.#size = {
      origin: size,
      current: size,
    }

    this.init()
  }

  init() {
    // this.#shiftOpacity()
  }

  getDistance() {
    const dx = this.#position.current.x - this.#position.origin.x
    const dy = this.#position.current.y - this.#position.origin.y
    const d = Math.round(dx + dy)
    return { dx, dy, d }
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

  shiftOpacity() {
    // shift the opacity according to the distance to the origin
    const { d } = this.getDistance()
    this.#color.current.alpha =
      Math.abs(d) > Particle.maxDistanceOpacity
        ? 0
        : 1 - Math.abs(d) / Particle.maxDistanceOpacity
  }

  moveTowardsOrigin() {
    const { dx, dy } = this.getDistance()
    // move the particle towards the origin
    if (Math.abs(dx) > 0) this.#position.current.x -= dx * 0.1
    if (Math.abs(dy) > 0) this.#position.current.y -= dy * 0.1
  }

  update() {
    this.moveTowardsOrigin()
    // this.#shiftOpacity()
  }
}

export { Particle }
