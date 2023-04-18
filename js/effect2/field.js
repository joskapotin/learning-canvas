import { scaleValue } from "../utils.js"
import { Cell } from "./cell.js"
import { simplexNoise } from "./perlin.js"

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
    const simplex = simplexNoise()
    simplex.seed(Math.random())
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const color = "hsla(40, 100%, 50%, 1)"
        const noise = Math.abs(simplex.perlin2(x / this.cols, y / this.rows))
        this.cells.push(
          // angle: (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve
          new Cell({
            x: x * this.resolution,
            y: y * this.resolution,
            size: this.resolution,
            color,
            length: scaleValue(noise, [-1, 1], [5, 10]),
            angle: (noise * this.curve) / this.zoom,
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
