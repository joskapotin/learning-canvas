class Particle {
  static maxDistanceOpacity = 20

  constructor({ effect, size, color, position }) {
    this.effect = effect
    this.position = {
      ...position,
      current: position.start,
      next: position.origin,
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

    this.step = false

    this.init()
  }

  init() {
    // this.shiftOpacity()
    this.velocity = this.getVelocity()

    // move this to the effect class
    this.setRandomizedSize()
  }

  setRandomizedSize() {
    const randomizedSize = Math.floor(
      this.size.origin * (0.5 + Math.random() * 0.5)
    )
    this.size.current = randomizedSize

    const offset = Math.floor((this.size.origin - randomizedSize) * 0.5)
    this.position.current.x += offset
    this.position.current.y += offset
  }

  getDistance() {
    const x = Math.floor(this.position.current.x - this.position.next.x)
    const y = Math.floor(this.position.current.y - this.position.next.y)
    const d = x + y
    return { x, y, d }
  }

  getVelocity() {
    // TODO: fix the velocity
    // A number between 0 and 1
    // Big distance = hight velocity
    // Small distance = low velocity
    const acceleration = 0.2
    const { x, y } = this.getDistance()

    // clamp function
    const clamp = (value, min, max) => {
      return Math.min(Math.max(value, min), max)
    }

    return {
      x: clamp(Math.abs(x), 0, acceleration),
      y: clamp(Math.abs(y), 0, acceleration),
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

  move() {
    this.position.next = this.step ? this.position.end : this.position.origin
    const distanceToDestination = this.getDistance()
    // this.step = distanceToDestination.d > 0 ? this.step : !this.sep

    if (Math.abs(distanceToDestination.x) > 0)
      this.position.current.x -= distanceToDestination.x * this.velocity.x
    if (Math.abs(distanceToDestination.y) > 0)
      this.position.current.y -= distanceToDestination.y * this.velocity.y
  }

  update() {
    this.move()
    // this.shiftOpacity()
  }
}

export { Particle }
