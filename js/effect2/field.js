import { Cell } from "./cell.js"

class Field {
  constructor({ canvas, ctx, size = 8 }) {
    this.canvas = canvas
    this.ctx = ctx
    this.size = size
    this.cells = []
  }

  init() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.createCells()
    this.draw()
  }

  createCells() {
    for (let y = 0; y < this.canvas.height; y += this.size) {
      const row = []
      for (let x = 0; x < this.canvas.width; x += this.size) {
        row.push(
          new Cell({
            x,
            y,
            size: this.size,
            color: "rgba(255, 255, 255, 0.5)",
          })
        )
      }
      this.cells.push(row)
    }
  }

  draw() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.draw(this.ctx)
      })
    })
  }
}

export { Field }
