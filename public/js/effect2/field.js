import { getAverageColor } from "./helpers.js";
import { createParticle } from "./particle.js";
const createField = ({ pixelGrid, size = { width: 2, height: 2 }, row = 4, col = 4, }) => {
    if (col < 1 || row < 1)
        throw new Error("Invalid field size");
    const field = [];
    for (let y = 0; y < pixelGrid.length; y += size.height) {
        for (let x = 0; x < pixelGrid[y].length; x += size.width) {
            const surroundingPixels = [];
            for (let i = 0; i < size.width; i += 1) {
                for (let j = 0; j < size.height; j += 1) {
                    if (pixelGrid[y + i] && pixelGrid[y + i][x + j])
                        surroundingPixels.push(pixelGrid[y + i][x + j]);
                }
            }
            // get the average color of the surrounding pixels
            const averageColor = getAverageColor(surroundingPixels);
            // create the particle
            const particle = createParticle({
                size,
                position: { x, y },
                color: averageColor,
            });
            field.push(particle);
        }
    }
    // for (let y = 0; y < Math.floor(row); y++) {
    //   const fieldRow: ReturnType<typeof createParticle>[] = []
    //   for (let x = 0; x < Math.floor(col); x++) {
    //     // get the pixels surrounding the current pixel
    //     const surroundingPixels = []
    //     for (let i = 0; i < size.width; i += 1) {
    //       for (let j = 0; j < size.height; j += 1) {
    //         if (pixelGrid[y + i] && pixelGrid[y + i][x + j])
    //           surroundingPixels.push(pixelGrid[y + i][x + j])
    //       }
    //     }
    //     // calculate the position of the particle
    //     const positionX = x * size.width
    //     const positionY = y * size.height
    //     // create the particle
    //     fieldRow.push(
    //       createParticle({
    //         size,
    //         position: { x: positionX, y: positionY },
    //         color: getAverageColor(surroundingPixels),
    //       })
    //     )
    //   }
    //   field.push(fieldRow)
    // }
    return field;
};
export { createField };
