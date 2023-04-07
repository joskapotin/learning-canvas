const useCanvas = (canvasID: string) => {
  const canvas = document.getElementById(canvasID)

  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas not found")
  }

  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Canvas context not found")
  }

  return { canvas, ctx }
}

const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width
  canvas.height = height
}

type DrawImageProps = {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  x?: number
  y?: number
  width: number
  height: number
}
const drawImage = ({
  ctx,
  x = 0,
  y = 0,
  image,
  width,
  height,
}: DrawImageProps) => {
  ctx.drawImage(image, x, y, width, height)
}

export { drawImage, setCanvasSize, useCanvas }
