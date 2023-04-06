const createImageElement = imageUrl => {
  const image = new Image()
  image.src = imageUrl
  return image
}

const setCanvasSize = ({ canvas, image }) => {
  canvas.width = 256
  canvas.height = 256
}

const drawImage = ({ canvas, context, image }) => {
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
}

const create2dArrayFrom1dArray = (array, columns) => {
  return array.reduce((rows, key, index) => {
    return (
      (index % columns === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows
    )
  }, [])
}

const generateAverageColor = colorArray => {
  return colorArray
    .reduce(
      (acc, color) => {
        return [
          acc[0] + color[0],
          acc[1] + color[1],
          acc[2] + color[2],
          acc[3] + color[3],
        ]
      },
      [0, 0, 0, 0]
    )
    .map(color => Math.floor(color / colorArray.length))
}

const createCellGrid = ({ canvas, context, cellSize }) => {
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height)

  const pixelColors = create2dArrayFrom1dArray(data, 4)

  const pixelGrid = create2dArrayFrom1dArray(pixelColors, canvas.width)

  const cellGrid = []
  for (let row = 0; row < pixelGrid.length; row += cellSize) {
    const cells = []
    for (let col = 0; col < pixelGrid[row].length; col += cellSize) {
      const cell = []
      for (let i = 0; i < cellSize; i += 1) {
        for (let j = 0; j < cellSize; j += 1) {
          cell.push(pixelGrid[row + i][col + j])
        }
      }
      const averageColor = generateAverageColor(cell)

      cells.push(averageColor)
    }
    cellGrid.push(cells)
  }

  console.log("cellGrid", cellGrid)

  return cellGrid
}

const drawCell = ({ context, cell, x, y, cellSize }) => {
  context.fillStyle = `rgba(${cell[0]}, ${cell[1]}, ${cell[2]}, 1)`
  context.fillRect(x, y, cellSize, cellSize)
}

const play = ({ imageUrl, canvasId, cellSize = 2 }) => {
  const imageElement = createImageElement(imageUrl)
  imageElement.onload = () => {
    const canvas = document.getElementById(canvasId)
    const context = canvas.getContext("2d")

    setCanvasSize({ canvas, image: imageElement })

    drawImage({ canvas, context, image: imageElement })

    const cellGrid = createCellGrid({ canvas, context, cellSize })

    // context.clearRect(0, 0, canvas.width, canvas.height)

    for (let row = 0; row < cellGrid.length; row += 1) {
      for (let col = 0; col < cellGrid[row].length; col += 1) {
        drawCell({
          context,
          cell: cellGrid[row][col],
          x: row * cellSize,
          y: col * cellSize,
          cellSize,
        })
      }
    }
  }
}

play({ imageUrl: "image.jpg", canvasId: "canvas1", cellSize: 16 })
