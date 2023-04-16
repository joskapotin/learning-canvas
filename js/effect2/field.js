import { Cell } from "./cell.js"

class Field {
  constructor({ rows, cols, resolution = 8 }) {
    this.resolution = resolution
    this.rows = rows
    this.cols = cols

    this.cells = []

    this.init()
  }

  init() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const color = `hsla(40, 100%, 50%, 1)`
        this.cells.push(
          new Cell({
            x: x * this.resolution,
            y: y * this.resolution,
            size: this.resolution,
            color,
            length: this.resolution / 2,
            angle: (Math.cos(x) + Math.sin(y)).toFixed(2),
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
