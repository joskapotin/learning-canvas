import { scaleValue } from "../utils.js"
import { Cell } from "./cell.js"

class Field {
  constructor({ rows, cols, resolution = 8, curve = 0.5, zoom = 0.2 }) {
    this.resolution = resolution
    this.rows = rows
    this.cols = cols
    this.cells = []
    this.curve = curve
    this.zoom = zoom

    this.init()
  }

  init() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const color = "hsla(40, 100%, 50%, 1)"
        this.cells.push(
          new Cell({
            x: x * this.resolution,
            y: y * this.resolution,
            size: this.resolution,
            color,
            length: scaleValue(Math.random(), [0, 1], [1, 5]),
            angle: (
              (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) *
              this.curve
            ).toFixed(2),
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
