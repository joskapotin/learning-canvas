const createCanvasElement = () => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  return { canvas, ctx }
}

const createImageElement = imageUrl => {
  const image = new Image()
  image.src = imageUrl
  image.crossOrigin = "Anonymous"
  return image
}

const loadImage = imageUrl => {
  return new Promise((resolve, reject) => {
    const image = createImageElement(imageUrl)
    image.onload = () => resolve(image)
    image.onerror = error => reject(error)
  })
}

const drawImage = async imageUrl => {
  const { canvas, ctx } = createCanvasElement()
  const image = await loadImage(imageUrl)

  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0, image.width, image.height)

  return { ctx, image: { width: image.width, height: image.height } }
}

const getImageData = async imageUrl => {
  const { ctx, image } = await drawImage(imageUrl)
  const pixels = ctx.getImageData(0, 0, image.width, image.height).data

  return {
    width: image.width,
    height: image.height,
    pixels,
  }
}

export { getImageData }
