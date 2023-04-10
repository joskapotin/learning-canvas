class Particle {
  static maxDistanceOpacity = 20

  constructor({ canvas, size, color, position }) {
    this.position = {
      origin: { x: Math.ceil(position.x), y: Math.ceil(position.y) },
      current: {
        x: Math.ceil(Math.random() * canvas.width),
        y: Math.ceil(canvas.height - Math.random() * size * 2),
      },
    }

    this.color = {
      origin: color,
      current: color,
    }

    this.size = {
      origin: size,
      current: size,
    }

    this.velocity = {
      x: 0.1,
      y: 0.1,
    }

    this.init()
  }

  init() {
    // this.#shiftOpacity()
    // this.velocity = this.getVelocity()
  }

  getDistance() {
    const dx = Math.ceil(this.position.current.x - this.position.origin.x)
    const dy = Math.ceil(this.position.current.y - this.position.origin.y)
    const d = Math.ceil(dx + dy)
    return { dx, dy, d }
  }

  getVelocity() {
    // TODO: fix the velocity
    const ajuster = 0.0001
    const { dx, dy } = this.getDistance()
    if (dx === 0 || dy === 0) return { x: 1, y: 1 }

    return {
      x: Math.floor(Math.abs(dx)) * ajuster,
      y: Math.floor(Math.abs(dy)) * ajuster,
    }
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.position.current.x + this.size.current * 0.5,
      this.position.current.y + this.size.current * 0.25,
      this.size.current * 0.5,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = `rgba(${this.color.current.red}, ${this.color.current.green}, ${this.color.current.blue}, ${this.color.current.alpha})`
    ctx.fill()
  }

  drawSquare(ctx) {
    ctx.fillRect(
      this.position.current.x,
      this.position.current.y,
      this.size,
      this.size
    )
    ctx.fillStyle = `rgba(${this.color.current.red}, ${this.color.current.green}, ${this.color.current.blue}, ${this.color.current.alpha})`
  }

  shiftOpacity() {
    // shift the opacity according to the distance to the origin
    const { d } = this.getDistance()
    this.color.current.alpha =
      Math.abs(d) > Particle.maxDistanceOpacity
        ? 0
        : 1 - Math.abs(d) / Particle.maxDistanceOpacity
  }

  moveTowardsOrigin() {
    const { dx, dy } = this.getDistance()
    // move the particle towards the origin
    if (Math.abs(dx) > 0) this.position.current.x -= dx * this.velocity.x
    if (Math.abs(dy) > 0) this.position.current.y -= dy * this.velocity.y
  }

  update() {
    this.moveTowardsOrigin()
    // this.#shiftOpacity()
  }
}

export { Particle }
