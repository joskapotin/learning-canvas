const getNewCanvasSize = ({ canvas, resolution }) => {
  const parentWidth =
    Number(canvas.parentElement.clientWidth) +
    Number(canvas.parentElement.style.paddingInline) / 2
  const parentHeight =
    Number(canvas.parentElement.clientHeight) +
    Number(canvas.parentElement.style.paddingBlock) / 2

  return {
    width: Math.floor(parentWidth / resolution) * resolution,
    height: Math.floor(parentHeight / resolution) * resolution,
  }
}

const setNewCanvasSize = ({ canvas, resolution }) => {
  const { width, height } = getNewCanvasSize({ canvas, resolution })
  canvas.width = width
  canvas.height = height
}

const clearCanvas = ({ canvas, ctx }) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export { clearCanvas, getNewCanvasSize, setNewCanvasSize }
