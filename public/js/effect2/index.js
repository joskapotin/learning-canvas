var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawImage, setCanvasSize, useCanvas } from "./canvas.js";
import { createField } from "./field.js";
import { create2dArrayFrom1dArray, loadImage } from "./helpers.js";
const init = ({ imageUrl, particleSize = { width: 4, height: 4 }, }) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield loadImage(imageUrl);
    const { canvas, ctx } = useCanvas("canvas1");
    // calculate the number of particles in each row and in each column
    const particlesInRow = Math.ceil(image.width / particleSize.width);
    const particlesInColumn = Math.ceil(image.height / particleSize.height);
    // calculate the size of the canvas
    const canvasWidth = particlesInRow * particleSize.width;
    const canvasHeight = particlesInColumn * particleSize.height;
    setCanvasSize(canvas, canvasWidth, canvasHeight);
    // calculate the x and y offset of the image to center it in the canvas
    const xOffset = (canvasWidth - image.width) / 2;
    const yOffset = (canvasHeight - image.height) / 2;
    drawImage({
        ctx,
        image,
        x: xOffset,
        y: yOffset,
        width: image.width,
        height: image.height,
    });
    // get the image data
    const { data } = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    // format the data so each element is an array of [r, g, b, a]
    const pixelColors = create2dArrayFrom1dArray(data, 4);
    const pixelGrid = create2dArrayFrom1dArray(pixelColors, canvasWidth);
    // clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // create the field
    const field = createField({
        pixelGrid,
        size: particleSize,
        row: particlesInColumn,
        col: particlesInRow,
    });
    // draw the particles
    field.forEach(particle => {
        particle.draw(ctx);
    });
});
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    const particleSize = { width: 8, height: 8 };
    init({ imageUrl: "image.jpg", particleSize });
});
export { app };
