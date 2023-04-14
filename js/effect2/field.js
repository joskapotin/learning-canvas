import { getRandomRGBA } from "../utils.js"
import { Cell } from "./cell.js"
import { simplexNoise } from "./perlin.js"

class Field {
  constructor({ width, height, cellSize = 8 }) {
    this.width = width
    this.height = height
    this.cellSize = cellSize

    this.noiseZ = 0

    this.rows = Math.floor(this.height / this.cellSize)
    this.cols = Math.floor(this.width / this.cellSize)

    this.cells = []

    const noise = simplexNoise()
    noise.seed(Math.random())

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.cells.push(
          new Cell({
            x: x * this.cellSize,
            y: y * this.cellSize,
            size: this.cellSize,
            color: getRandomRGBA(),
            length: noise.simplex3(x, y, this.noiseZ),
            angle: noise.simplex3(y, x, this.noiseZ) * Math.PI * 2,
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
