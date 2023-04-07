import { drawImage, setCanvasSize, useCanvas } from "./canvas.js"
import { createField } from "./field.js"
import { create2dArrayFrom1dArray, loadImage } from "./helpers.js"

type InitProps = {
  imageUrl: string
  particleSize?: {
    width: number
    height: number
  }
}

const init = async ({
  imageUrl,
  particleSize = { width: 4, height: 4 },
}: InitProps) => {
  const image = await loadImage(imageUrl)
  const { canvas, ctx } = useCanvas("canvas1")

  // calculate the number of particles in each row and in each column
  const particlesInRow = Math.ceil(image.width / particleSize.width)
  const particlesInColumn = Math.ceil(image.height / particleSize.height)

  // calculate the size of the canvas
  const canvasWidth = particlesInRow * particleSize.width
  const canvasHeight = particlesInColumn * particleSize.height

  setCanvasSize(canvas, canvasWidth, canvasHeight)

  // calculate the x and y offset of the image to center it in the canvas
  const xOffset = (canvasWidth - image.width) / 2
  const yOffset = (canvasHeight - image.height) / 2

  drawImage({
    ctx,
    image,
    x: xOffset,
    y: yOffset,
    width: image.width,
    height: image.height,
  })

  // get the image data
  const { data } = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  // format the data so each element is an array of [r, g, b, a]
  const pixelColors = create2dArrayFrom1dArray(data, 4) as number[][]
  const pixelGrid = create2dArrayFrom1dArray(pixelColors, canvasWidth)

  // clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // create the field
  const field = createField({
    pixelGrid,
    size: particleSize,
    row: particlesInColumn,
    col: particlesInRow,
  })

  // draw the particles
  field.forEach(particle => {
    particle.draw(ctx)
  })
}

const app = async () => {
  const particleSize = { width: 8, height: 8 }
  init({ imageUrl: "image.jpg", particleSize })
}

export { app }
