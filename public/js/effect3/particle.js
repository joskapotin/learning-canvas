const createParticle = ({ size, color, position }) => {
  const x = Math.floor(position.x)
  const y = Math.floor(position.y)
  const radius = size / 2

  const drawCircle = ctx => {
    ctx.beginPath()
    ctx.arc(x + radius, y + radius / 2, radius, 0, Math.PI * 2)
    //ctx.fillStyle = `rgba(255,255,255,.5)`
    ctx.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`
    ctx.fill()
  }

  const drawSquare = ctx => {
    ctx.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`
    ctx.fillRect(x, y, size, size)
  }

  return {
    drawCircle,
    drawSquare,
  }
}

export { createParticle }
