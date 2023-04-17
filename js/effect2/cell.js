class Cell {
  constructor({ x, y, size, color, angle = 0, length = 0.5 }) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.angle = angle
    this.length = length
    this.debugColor = "rgba(255, 255, 255, 0.2)"
  }

  draw(ctx) {
    // outlines
    // ctx.save()
    // ctx.lineWidth = 1
    // ctx.strokeStyle = this.debugColor
    // ctx.translate(this.x, this.y)
    // ctx.beginPath()
    // ctx.moveTo(this.size, 0)
    // ctx.lineTo(this.size, this.size)
    // ctx.lineTo(0, this.size)
    // ctx.stroke()
    // ctx.restore()

    // vector
    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = this.debugColor
    ctx.fillStyle = this.debugColor
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
    ctx.rotate(this.angle)
    ctx.beginPath()
    ctx.arc(0, 0, this.size / 16, 0, 2 * Math.PI)
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.floor(this.size * 0.5), 0)
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    // text
    // ctx.save()
    // ctx.fillStyle = this.color
    // ctx.translate(this.x + 10 / 2, this.y + 10)
    // ctx.font = `16px monospace`
    // ctx.textAlign = "left"
    // ctx.textBaseline = "middle"
    // ctx.fillText(modulo(Math.floor(this.angle * (180 / Math.PI)), 360), 0, 0)
    // ctx.restore()
  }
}

export { Cell }
