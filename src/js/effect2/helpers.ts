const createImageElement = (imageUrl: string) => {
  const image = new Image()
  image.src = imageUrl
  image.crossOrigin = "Anonymous"
  return image
}

const loadImage = (imageUrl: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = createImageElement(imageUrl)
    image.onload = () => resolve(image)
    image.onerror = error => reject(error)
  })
}

const rgbArrayToString = (rgb: number[]) => {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`
}

const create2dArrayFrom1dArray = (array: any[], columns: number): any[][] => {
  return array.reduce((rows, key, index) => {
    return (
      (index % columns === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows
    )
  }, [])
}

const getAverageColor = (colorArray: number[][]) => {
  return colorArray
    .reduce(
      (acc: number[], color: number[]) => {
        return [
          acc[0] + color[0],
          acc[1] + color[1],
          acc[2] + color[2],
          acc[3] + color[3],
        ]
      },
      [0, 0, 0, 0]
    )
    .map(color => Math.floor(color / colorArray.length))
}

const generateRandomColor = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]
}

export {
  create2dArrayFrom1dArray,
  generateRandomColor,
  getAverageColor,
  loadImage,
  rgbArrayToString,
}
