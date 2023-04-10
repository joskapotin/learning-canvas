class Particle {
  static maxDistanceOpacity = 20

  constructor({ effect, size, color, position }) {
    this.effect = effect
    this.position = {
      origin: { x: position.x, y: position.y },
      current: { x: position.x, y: position.y },
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
    // this.shiftOpacity()
    // this.velocity = this.getVelocity()

    this.setToBottom()
    this.setRandomizedSize()
  }

  setToBottom() {
    this.position.current.x = Math.floor(
      Math.random() * this.effect.canvas.width
    )
    this.position.current.y = Math.floor(
      this.effect.canvas.height - Math.random() * this.size.current * 2
    )
  }

  setRandomizedSize() {
    const randomizedSize = Math.floor(
      this.size.origin * (0.5 + Math.random() * 0.5)
    )
    this.size.current = randomizedSize

    const offset = (this.size.origin - randomizedSize) * 0.5
    this.position.current.x += offset
    this.position.current.y += offset
  }

  getDistance() {
    const dx = this.position.current.x - this.position.origin.x
    const dy = this.position.current.y - this.position.origin.y
    const d = dx + dy
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
      this.size.current,
      this.size.current
    )
    ctx.fillStyle = `rgba(${this.color.current.red}, ${this.color.current.green}, ${this.color.current.blue}, ${this.color.current.alpha})`
  }

  shiftOpacity() {
    // TODO: fix the opacity
    // shift the opacity according to the distance from the origin
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
    // this.shiftOpacity()
  }
}

export { Particle }
