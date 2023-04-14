import { Cell } from "./cell.js"

class Field {
  constructor({ width, height, cellSize = 8 }) {
    this.width = width
    this.height = height
    this.cellSize = cellSize

    this.rows = Math.floor(this.height / this.cellSize)
    this.cols = Math.floor(this.width / this.cellSize)

    this.cells = []
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
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
