const setCanvasSize = ({ canvas, width, height }) => {
  canvas.width = width
  canvas.height = height
}

const drawImage = ({ canvasWidth, canvasHeight, context, image }) => {
  context.drawImage(image, 0, 0, canvasWidth, canvasHeight)
}

const drawParticule = ({ context, particule }) => {
  // context.strokeStyle = "#0000ff"
  // context.strokeRect(x, y, cellSize, cellSize)
  context.fillStyle = `rgba(${particule.color[0]}, ${particule.color[1]}, ${particule.color[2]}, 1)`
  // context.fillRect(particule.x, particule.y, particule.width, particule.height)
  context.beginPath()
  context.ellipse(
    particule.x + particule.width / 2,
    particule.y + particule.height / 2,
    particule.width / 2,
    particule.height / 2,
    0,
    0,
    2 * Math.PI,
    false
  )
  context.fill()
}

const drawParticules = ({ context, particules }) => {
  particules.forEach(particule => {
    drawParticule({ context, particule })
  })
}

export { drawImage, drawParticules, setCanvasSize }
