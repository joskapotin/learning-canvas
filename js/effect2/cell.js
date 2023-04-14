class Cell {
  constructor({ x, y, size, color, angle = 0 }) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.angle = angle
  }

  draw(ctx) {
    // outlines
    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = this.color
    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.moveTo(this.size, 0)
    ctx.lineTo(this.size, this.size)
    ctx.lineTo(0, this.size)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
    ctx.rotate(this.angle * Math.PI * 2)
    ctx.beginPath()
    ctx.arc(0, 0, 5, 0, 2 * Math.PI)
    ctx.moveTo(0, 0)
    ctx.lineTo(this.size / 2, 0)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}

export { Cell }
