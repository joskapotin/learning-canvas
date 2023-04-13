import { Field } from "./field.js"

const effect = ({ canvasID, size }) => {
  const canvas = document.getElementById(canvasID)
  const ctx = canvas.getContext("2d")

  const resizeCanvas = () => {
    // Field width need to be a multiple of the cell size
    // we need the inner size of it's parent and the padding
    const parentWidth =
      canvas.parentElement.clientWidth +
      canvas.parentElement.style.paddingInline / 2
    const parentHeight =
      canvas.parentElement.clientHeight +
      canvas.parentElement.style.paddingBlock / 2

    canvas.width = Math.floor(parentWidth / size) * size
    canvas.height = Math.floor(parentHeight / size) * size
  }

  const field = new Field({
    canvas,
    ctx,
    size,
  })

  console.log(field)

  window.addEventListener("resize", () => {
    resizeCanvas()
    field.init()
  })

  resizeCanvas()
  field.init(canvas)
}

export { effect }
