const createImageElement = (imageUrl) => {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "Anonymous";
    return image;
};
const loadImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const image = createImageElement(imageUrl);
        image.onload = () => resolve(image);
        image.onerror = error => reject(error);
    });
};
const rgbArrayToString = (rgb) => {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
};
const create2dArrayFrom1dArray = (array, columns) => {
    return array.reduce((rows, key, index) => {
        return ((index % columns === 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows);
    }, []);
};
const getAverageColor = (colorArray) => {
    return colorArray
        .reduce((acc, color) => {
        return [
            acc[0] + color[0],
            acc[1] + color[1],
            acc[2] + color[2],
            acc[3] + color[3],
        ];
    }, [0, 0, 0, 0])
        .map(color => Math.floor(color / colorArray.length));
};
const generateRandomColor = () => {
    return [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
    ];
};
export { create2dArrayFrom1dArray, generateRandomColor, getAverageColor, loadImage, rgbArrayToString, };
