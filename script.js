import { Effect as Effect1 } from "./js/effect1/effect.js"
import { effect as effect2 } from "./js/effect2/index.js"

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

effect2({
  canvasID: "canvas2",
  size: 32,
})
