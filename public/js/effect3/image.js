const createImage = async (ctx, imageUrl) => {
  const createImageElement = url => {
    const image = new Image()
    image.src = url
    image.crossOrigin = "Anonymous"
    return image
  }

  const loadImage = url => {
    return new Promise((resolve, reject) => {
      const image = createImageElement(url)
      image.onload = () => resolve(image)
      image.onerror = error => reject(error)
    })
  }

  const image = await loadImage(imageUrl)

  //Draw the image in the center of the canvas
  const offsetX = (ctx.canvas.width - image.width) / 2
  const offsetY = (ctx.canvas.height - image.height) / 2

  ctx.drawImage(image, offsetX, offsetY, image.width, image.height)

  //exctract the image data
  const pixels = ctx.getImageData(
    offsetX,
    offsetY,
    image.width,
    image.height
  ).data

  return {
    offsetX,
    offsetY,
    width: image.width,
    height: image.height,
    pixels,
  }
}

export { createImage }
