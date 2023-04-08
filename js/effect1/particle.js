class Particle {
  constructor({ canvas, size, color, position }) {
    this.originX = Math.floor(position.x)
    this.originY = Math.floor(position.y)
    this.originColor = color
    // this.x = this.originX
    // this.y = this.originY

    this.x = Math.floor(Math.random() * canvas.width)
    this.y = Math.floor(Math.random() * canvas.height)
    this.size = size
    this.radius = this.size / 2
    this.color = { ...color, alpha: 0.5 }
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
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alpha})`
  }

  update() {
    this.dx = Math.floor(this.x - this.originX)
    this.dy = Math.floor(this.y - this.originY)
    if (this.dx === 0 && this.dy === 0) return
    this.x -= this.dx * 0.1
    this.y -= this.dy * 0.1
    if (this.dx === 0 && this.dy === 0) {
      this.color.alpha = 1
    } else {
      this.color.alpha = 1 / (this.dx * this.dx) + 0.5
    }
  }
}

export { Particle }
