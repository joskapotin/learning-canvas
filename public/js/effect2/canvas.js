const useCanvas = (canvasID) => {
    const canvas = document.getElementById(canvasID);
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas not found");
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas context not found");
    }
    return { canvas, ctx };
};
const setCanvasSize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
};
const drawImage = ({ ctx, x = 0, y = 0, image, width, height, }) => {
    ctx.drawImage(image, x, y, width, height);
};
export { drawImage, setCanvasSize, useCanvas };
