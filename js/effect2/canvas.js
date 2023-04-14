const getNewCanvasSize = ({ canvas, cellSize }) => {
  const parentWidth =
    Number(canvas.parentElement.clientWidth) +
    Number(canvas.parentElement.style.paddingInline) / 2
  const parentHeight =
    Number(canvas.parentElement.clientHeight) +
    Number(canvas.parentElement.style.paddingBlock) / 2

  return {
    width: Math.floor(parentWidth / cellSize) * cellSize,
    height: Math.floor(parentHeight / cellSize) * cellSize,
  }
}

const setNewCanvasSize = ({ canvas, cellSize }) => {
  const { width, height } = getNewCanvasSize({ canvas, cellSize })
  canvas.width = width
  canvas.height = height
}

const clearCanvas = ({ canvas, ctx }) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export { clearCanvas, getNewCanvasSize, setNewCanvasSize }
