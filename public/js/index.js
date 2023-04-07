import { drawImage, drawParticules, setCanvasSize } from "./canvas.js"
import { createImageElement } from "./helpers.js"
import { createParticules } from "./particules.js"

const init = ({ imageUrl, canvasId, particuleWidth, particuleHeight }) => {
  // Create image element
  const imageElement = createImageElement(imageUrl)

  // When image is loaded do this
  imageElement.onload = () => {
    // initialize canvas
    const canvas = document.getElementById(canvasId)
    const context = canvas.getContext("2d")
    setCanvasSize({
      canvas,
      width: imageElement.width,
      height: imageElement.height,
    })

    // draw image on canvas
    drawImage({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      context,
      image: imageElement,
    })

    // create an array of particules
    const particulesWidthFloored = Math.floor(particuleWidth) || 16
    const particulesHeightFloored =
      Math.floor(particuleHeight) || particulesWidthFloored

    const particules = createParticules({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      context,
      width: particulesWidthFloored,
      height: particulesHeightFloored || particulesWidthFloored,
    })

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // resize the canvas. The image size can't always be divisible.

    // find the remainder of canvas width divide by particule width
    const remainderWidth = canvas.width % particulesWidthFloored

    // find the remainder of canvas height divide by particule height
    const remainderHeight = canvas.height % particulesHeightFloored

    // resize the canvas
    setCanvasSize({
      canvas,
      width: canvas.width - remainderWidth,
      height: canvas.height - remainderHeight,
    })

    // draw the particules
    drawParticules({ context, particules })
  }
}

export { init }
