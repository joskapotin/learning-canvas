//   const drawParticule = ({ context, particule }) => {
//     // context.strokeStyle = "#0000ff"
//     // context.strokeRect(x, y, cellSize, cellSize)
//     context.fillStyle = `rgba(${particule.color[0]}, ${particule.color[1]}, ${
//       particule.color[2]
//     }, ${(particule.color[3] * 1) / 255})`
//     // context.fillRect(particule.x, particule.y, particule.width, particule.height)
//     context.beginPath()
//     context.ellipse(
//       particule.x + particule.width / 2,
//       particule.y + particule.height / 2,
//       particule.width / 2,
//       particule.height / 2,
//       0,
//       0,
//       2 * Math.PI,
//       false
//     )
//     context.fill()
//   }
const createParticle = ({ size, position }) => {
    return {
        position,
        size,
        value: Math.floor(Math.random() * 10),
    };
};
export { createParticle };
