import {
  create2dArrayFrom1dArray,
  generateRandomColor,
  getAverageColor,
} from "./helpers.js"

const createParticule = ({ width, height, x, y, color }) => {
  return {
    width,
    height,
    originX: x,
    originY: y,
    x,
    y,
    color,
  }
}

const createParticules = ({
  canvasWidth,
  canvasHeight,
  context,
  width,
  height,
}) => {
  const { data } = context.getImageData(0, 0, canvasWidth, canvasHeight)

  // format the data so each element is an array of [r, g, b, a]
  const pixelColors = create2dArrayFrom1dArray(data, 4)

  const pixelGrid = create2dArrayFrom1dArray(pixelColors, canvasWidth)

  const particules = []
  for (let row = 0; row < pixelGrid.length; row += height) {
    for (let col = 0; col < pixelGrid[row].length; col += width) {
      const surroundingPixels = []
      for (let i = 0; i < width; i += 1) {
        for (let j = 0; j < height; j += 1) {
          if (pixelGrid[row + i] && pixelGrid[row + i][col + j])
            surroundingPixels.push(pixelGrid[row + i][col + j])
        }
      }

      // get the average color of the surrounding pixels
      const averageColor = getAverageColor(surroundingPixels)

      // add somerandomness to the color
      const randomColor = generateRandomColor()
      const averageColorRandomized = getAverageColor([
        averageColor,
        averageColor,
        averageColor,
        averageColor,
        averageColor,
        //randomColor,
      ])

      const particule = createParticule({
        width,
        height,
        x: col,
        y: row,
        color: averageColorRandomized,
      })

      particules.push(particule)
    }
  }

  return particules
}

export { createParticules }
