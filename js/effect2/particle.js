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
    this.maxHistory = 100
  }

  draw(ctx) {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color

    // draw the particle
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()

    // draw the history
    ctx.beginPath()
    ctx.moveTo(this.history[0].x, this.history[0].y)
    this.history.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()

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
