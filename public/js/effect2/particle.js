import { rgbArrayToString } from "./helpers.js";
const drawCell = ({ ctx, position, size, color }) => {
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(position.x, position.y, size.width, size.height);
};
const drawRectangle = ({ ctx, position, size, color }) => {
    ctx.fillStyle = rgbArrayToString(color);
    ctx.fillRect(position.x, position.y, size.width, size.height);
};
const drawParticle = ({ ctx, position, size, color }) => {
    //drawCell({ ctx, position, size, color })
    drawRectangle({ ctx, position, size, color });
};
const createParticle = ({ size, position, color = [0, 0, 0, 0], }) => {
    return {
        position,
        size,
        color,
        draw: (ctx) => {
            drawParticle({ ctx, position, size, color });
        },
    };
};
export { createParticle };
