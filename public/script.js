const createImageElement = imageUrl => {
  const image = new Image()
  image.src = imageUrl
  return image
}

const setCanvasSize = ({ canvas, image }) => {
  canvas.width = image.width
  canvas.height = image.height
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

const createParticule = ({ size, x, y, color }) => {
  return {
    size,
    x,
    y,
    color,
  }
}

const createParticules = ({ canvas, context, size }) => {
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height)

  // format the data so each element is an array of [r, g, b, a]
  const pixelColors = create2dArrayFrom1dArray(data, 4)

  // create a grid of pixels (2d array)
  const pixelGrid = create2dArrayFrom1dArray(pixelColors, canvas.width)

  // create particules object array
  const particules = []
  for (let row = 0; row < pixelGrid.length; row += size) {
    // step inside the row
    for (let col = 0; col < pixelGrid[row].length; col += size) {
      // step inside the column
      // loop through the pixels in the cell
      const cell = []
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          if (pixelGrid[row + i] && pixelGrid[row + i][col + j])
            cell.push(pixelGrid[row + i][col + j])
        }
      }
      // average the colors of the pixels in the cell
      const averageColor = generateAverageColor(cell)

      // create a particule
      const particule = createParticule({
        size: size,
        x: col,
        y: row,
        color: `rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]}, 1)`,
      })

      // add the particule to the array
      particules.push(particule)
    }
  }

  return particules
}

const drawParticule = ({ context, particule }) => {
  // context.strokeStyle = "#0000ff"
  // context.strokeRect(x, y, cellSize, cellSize)
  context.fillStyle = particule.color
  context.fillRect(particule.x, particule.y, particule.size, particule.size)
}

const drawParticules = ({ context, particules }) => {
  particules.forEach(particule => {
    drawParticule({ context, particule })
  })
}

const init = ({ imageUrl, canvasId, size = 2 }) => {
  // Create image element
  const imageElement = createImageElement(imageUrl)

  // When image is loaded do this
  imageElement.onload = () => {
    // initialize canvas
    const canvas = document.getElementById(canvasId)
    const context = canvas.getContext("2d")
    setCanvasSize({ canvas, image: imageElement })

    // draw image on canvas
    drawImage({ canvas, context, image: imageElement })

    // create an array of particules
    const particules = createParticules({ canvas, context, size })

    // remove the image
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw the particules
    drawParticules({ context, particules, size })
  }
}

init({ imageUrl: "image.jpg", canvasId: "canvas1", size: 4 })
