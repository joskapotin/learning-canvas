class Cell {
  constructor({ x, y, size, color }) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.debug = true
  }

  draw(ctx) {
    if (this.debug) {
      ctx.strokeWidth = 0.5
      ctx.strokeStyle = "rgba(255, 255, 255, 1)"
      ctx.strokeRect(this.x, this.y, this.size, this.size)
    }
    // ctx.fillStyle = "rgba(40, 0, 0, 0.5)"
    // ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

export { Cell }
