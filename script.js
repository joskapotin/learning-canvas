import { Effect as Effect1 } from "./js/effect1/effect.js"
import { Effect as Effect2 } from "./js/effect2/effect.js"

const effect1 = () => {
  const effect = new Effect1({
    canvasID: "canvas1",
    imageUrl: "destin_inconnu-1970-96x110.jpg",
    radius: 5,
    gap: 0,
    velocity: 50,
  })
  effect.init()

  // console.log("effect1", effect1)
}

effect1()

const effect2 = () => {
  const effect = new Effect2({
    canvasID: "canvas2",
    resolution: 64,
    particleAmount: 50,
    debug: true,
  })
  effect.init()

  console.log("effect2", effect)
}
effect2()
