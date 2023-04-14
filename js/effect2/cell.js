class Cell {
  constructor({ x, y, size, color, angle = 0 }) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.angle = angle
  }

  draw(ctx) {
    ctx.lineWidth = 1
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.moveTo(this.x + this.size, this.y)
    ctx.lineTo(this.x + this.size, this.y + this.size)
    ctx.lineTo(this.x, this.y + this.size)
    ctx.stroke()
    // ctx.fillStyle = "rgba(40, 0, 0, 0.5)"
    // ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

export { Cell }
