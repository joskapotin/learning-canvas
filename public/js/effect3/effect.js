import { createImage } from "./image.js"
import { createParticle } from "./particle.js"

const createEffect = async ({ canvasID, imageUrl, size = 16 }) => {
  // canvas setup
  const canvas = document.getElementById(canvasID)
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // draw the image
  const { offsetX, offsetY, width, height, pixels } = await createImage(
    ctx,
    imageUrl
  )

  // analyze the image,extract color and create the particles
  const gap = size
  const particles = []
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const index = (y * width + x) * 4
      const red = pixels[index + 0]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      const alpha = pixels[index + 3]
      if (alpha > 128) {
        particles.push(
          createParticle({
            size,
            color: { red, green, blue, alpha },
            position: { x: x + offsetX, y: y + offsetY },
          })
        )
      }
    }
  }

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw the particles
  const draw = () => {
    particles.forEach(particle => {
      //particle.drawSquare(ctx)
      particle.drawCircle(ctx)
    })
  }

  return {
    draw,
  }
}

export { createEffect }
