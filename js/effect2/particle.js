class Particle {
  constructor({
    radius,
    color,
    position,
    velocity = {
      x: 0,
      y: 0,
    },
  }) {
    this.radius = radius
    this.color = color
    this.position = position
    this.velocity = velocity
    this.history = [{ x: this.position.x, y: this.position.y }]
    this.maxHistory = 2
  }

  draw(ctx) {
    ctx.save()
    ctx.lineWidth = 2
    // draw a circle
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()

    // draw a line
    // ctx.strokeStyle = this.color
    // ctx.beginPath()
    // ctx.moveTo(this.position.x, this.position.y)
    // ctx.lineTo(this.history[0].x, this.history[0].y)
    // ctx.stroke()
    // ctx.restore()
  }

  drawHistory(ctx) {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color

    // draw the history
    for (let i = this.history.length - 1; i >= 0; i--) {
      const ratio = i / this.history.length
      ctx.beginPath()
      ctx.arc(
        this.history[i].x,
        this.history[i].y,
        this.radius * ratio,
        0,
        2 * Math.PI
      )
      ctx.fill()
    }

    ctx.restore()
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // add the current position to the history
    this.history.push({ x: this.position.x, y: this.position.y })
    // remove the oldest position from the history
    if (this.history.length > this.maxHistory) this.history.shift()
  }
}

export { Particle }
