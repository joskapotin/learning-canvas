import { rgbArrayToString } from "./helpers.js"

type size = {
  width: number
  height: number
}
type position = {
  x: number
  y: number
}
type drawParticleProps = {
  ctx: CanvasRenderingContext2D
  size: size
  position: position
  color: number[]
}
type CreateParticleProps = {
  size: size
  position: position
  color?: number[]
}

const drawCell = ({ ctx, position, size, color }: drawParticleProps) => {
  ctx.strokeStyle = "#ffffff"
  ctx.strokeRect(position.x, position.y, size.width, size.height)
}

const drawRectangle = ({ ctx, position, size, color }: drawParticleProps) => {
  ctx.fillStyle = rgbArrayToString(color)
  ctx.fillRect(position.x, position.y, size.width, size.height)
}

const drawParticle = ({ ctx, position, size, color }: drawParticleProps) => {
  //drawCell({ ctx, position, size, color })
  drawRectangle({ ctx, position, size, color })
}

const createParticle = ({
  size,
  position,
  color = [0, 0, 0, 0],
}: CreateParticleProps) => {
  return {
    position,
    size,
    color,
    draw: (ctx: CanvasRenderingContext2D) => {
      drawParticle({ ctx, position, size, color })
    },
  }
}

export { createParticle }
