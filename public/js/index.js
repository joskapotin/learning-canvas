import { drawImage, drawParticules, setCanvasSize } from "./canvas.js"
import { createImageElement } from "./helpers.js"
import { createParticules } from "./particules.js"

const init = ({ imageUrl, canvasId, row = 2, col = 2 }) => {
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
    const particules = createParticules({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      context,
      width: Math.round(canvas.width / col),
      height: Math.round(canvas.height / row),
    })

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw the particules
    drawParticules({ context, particules })
  }
}

export { init }
