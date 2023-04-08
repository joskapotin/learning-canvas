import { Effect } from "./effect.js"

const app = async () => {
  const effect = new Effect({
    canvasID: "canvas1",
    imageUrl: "image.jpg",
    size: 8,
    gap: 1,
  })
  await effect.init()

  console.log("effect", effect)

  window.addEventListener("mousedown", () => {
    const interval = setInterval(() => {
      effect.clearCanvas()
      effect.update()
    }, 1000 / 60)
    window.addEventListener(
      "mouseup",
      () => {
        clearInterval(interval)
      },
      { once: true }
    )
  })
}

export { app }
