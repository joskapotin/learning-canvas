import { createEffect } from "./effect.js"

const app = async () => {
  const effect = await createEffect({
    canvasID: "canvas1",
    imageUrl: "image.jpg",
  })
  effect.draw()
}

export { app }
