import { Cell } from "./cell.js"

class Field {
  constructor({ width, height, cellSize = 8 }) {
    this.width = width
    this.height = height
    this.cellSize = cellSize

    this.rowAmount = Math.floor(this.height / this.cellSize)
    this.columnAmount = Math.floor(this.width / this.cellSize)

    this.cells = []
    for (let y = 0; y < this.rowAmount; y += 1) {
      for (let x = 0; x < this.columnAmount; x += 1) {
        this.cells.push(
          new Cell({
            x: x * this.cellSize,
            y: y * this.cellSize,
            size: this.cellSize,
            color: "rgba(255, 255, 255, 0.5)",
            angle: Math.cos(x) * Math.sin(y),
          })
        )
      }
    }
  }

  draw(ctx) {
    this.cells.forEach(cell => cell.draw(ctx))
  }
}

export { Field }
