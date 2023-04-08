class Particle {
  constructor({ size, color, position }) {
    this.originX = Math.floor(position.x)
    this.originY = Math.floor(position.y)
    this.x = this.originX
    this.y = this.originY
    this.radius = size / 2
    this.color = color
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
    //ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alpha})`
    ctx.fill()
  }

  drawSquare(ctx) {
    //ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alpha})`
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

export { Particle }
