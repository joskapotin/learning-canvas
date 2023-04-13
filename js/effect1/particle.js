class Particle {
  constructor({ effect, radius, color, position, velocity = 0 }) {
    this.effect = effect

    this.position = position
    this.position.current = { ...position.start }
    this.position.to = { ...position.origin }

    this.color = {}
    this.color.origin = color
    this.color.current = color

    this.radius = {}
    this.radius.origin = radius
    this.radius.current = this.radius.origin

    this.velocity = {}
    this.velocity.x = velocity
    this.velocity.y = velocity

    this.init()
  }

  init() {
    // move this to the effect class
    this.setRandomizedSize()
    this.setAcceleration()
  }

  snap() {
    this.position.current = this.position.to
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }

  getRandomSize() {
    return this.clamp(
      this.radius.origin * Math.random(),
      this.radius.origin * 0.5,
      this.radius.origin
    )
  }

  setRandomizedSize() {
    this.radius.current = this.getRandomSize()
  }

  getDistance() {
    const x = this.position.current.x - this.position.to.x
    const y = this.position.current.y - this.position.to.y
    const d = x + y
    return { x, y, d }
  }

  setDistance() {
    const { x, y, d } = this.getDistance()
    this.distance = { x, y, d }
  }

  getAcceleration() {
    const { x, y } = this.getDistance()
    const accX = x / (this.effect.image.width + this.effect.canvas.width) // .toFixed(5)
    const accY = y / (this.effect.image.height + this.effect.canvas.height) // .toFixed(5)
    return {
      x: accX * this.velocity.x,
      y: accY * this.velocity.y,
    }
  }

  setAcceleration() {
    const { x, y } = this.getAcceleration()
    this.acceleration = { x, y }
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.position.current.x + this.radius.origin,
      this.position.current.y + this.radius.origin,
      this.radius.current,
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
      this.radius.current * 2,
      this.radius.current * 2
    )
    ctx.fillStyle = `rgba(${this.color.current.red}, ${this.color.current.green}, ${this.color.current.blue}, ${this.color.current.alpha})`
  }

  move() {
    this.setAcceleration()
    // this.position.next = this.step ? this.position.end : this.position.origin
    // this.step = distance.d > 0 ? this.step : !this.sep

    if (
      Math.abs(this.acceleration.x) < 0.02 &&
      Math.abs(this.acceleration.y) < 0.02
    ) {
      this.snap()
    } else {
      this.position.current.x -= this.acceleration.x
      this.position.current.y -= this.acceleration.y
    }

    // TODO second animation
    // if (
    //   Math.abs(this.acceleration.x) === 0 &&
    //   Math.abs(this.acceleration.y) === 0
    // ) {
    //   this.position.to = { ...this.position.end }
    //   this.setAcceleration()
    // }

    // TODO reset position if animation is done
    // if (
    //   this.position.current.x === this.position.end.x ||
    //   this.position.current.y === this.position.end.y
    // ) {
    //   this.position.current = { ...this.position.start }
    //   this.position.to = { ...this.position.origin }
    //   this.setAcceleration()
    //   this.setRandomizedSize()
    // }
  }

  update() {
    this.move()
  }
}

export { Particle }
