class Particle {
  constructor({ radius, color, position, angle = 0, velocity }) {
    this.radius = radius
    this.color = color
    this.position = position
    this.velocity = {
      x: 0,
      y: 0,
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

export { Particle }
