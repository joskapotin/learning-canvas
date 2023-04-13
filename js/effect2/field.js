import { Cell } from "./cell.js"

class Field {
  constructor({ canvas, ctx, size = 8 }) {
    this.canvas = canvas
    this.ctx = ctx
    this.size = size
  }

  init() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.createCells()
    this.draw()
  }

  createCells() {
    this.cells = []
    for (let y = 0; y < this.canvas.height; y += this.size) {
      for (let x = 0; x < this.canvas.width; x += this.size) {
        this.cells.push(
          new Cell({
            x,
            y,
            size: this.size,
            color: "rgba(40, 0, 0, 0.5)",
          })
        )
      }
    }
  }

  draw() {
    this.cells.forEach(cell => cell.draw(this.ctx))
  }
}

export { Field }
