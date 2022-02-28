import express from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const validateParameters = (req: express.Request): boolean => {
  const query = req.query

  if (Object.keys(query).length === 3 && query.constructor === Object) {
    const { filename, height, width } = query
    const nFileName = (filename as unknown as string).trim()
    const nWidth = (width as unknown as string).trim()
    const nHeight = (height as unknown as string).trim()

    if (nFileName && nWidth && nHeight) {
      const pattern = new RegExp(/^\d+$/)
      if (pattern.test(nWidth) && pattern.test(nHeight)) {
        return true
      }
    }
  }
  return false
}

const getInitialPath = (filename: string): string => {
  return path.resolve(__dirname, `../../assets/images/${filename}`)
}
const getThumbnailPath = (filename: string): string => {
  return path.resolve(__dirname, `../../assets/images/thumbnails/${filename}`)
}

const isImageExists = async (filename: string): Promise<boolean> => {
  let status = false
  const pathToImage = filename
  if (await fs.existsSync(pathToImage)) {
    status = true
  } else {
    status = false
  }
  return status
}

const createThumbnailPath = async (
  width: number,
  height: number,
  filename: string
): Promise<void> => {
  const pathToImage = getInitialPath(filename)
  const pathToThumbnail = getThumbnailPath(`${width}-${height}-${filename}`)

  try {
    await sharp(pathToImage)
      .resize(width, height, { fit: 'contain' })
      .toFile(pathToThumbnail)
  } catch {
    console.log('Error occured while processing image');
  }    
}

const imageProcess = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  if (validateParameters(req)) {
    const { width, height, filename } = req.query
    const nWidth = parseInt(width as unknown as string)
    const nHeight = parseInt(height as unknown as string)
    if (await isImageExists(getInitialPath(filename as unknown as string))) {
      const name = `${width}-${height}-${filename}`
      if (!(await isImageExists(getThumbnailPath(name as unknown as string)))) {
        await createThumbnailPath(
          nWidth,
          nHeight,
          filename as unknown as string
        )
      }
    }
  } else {
    next()
  }
  next()
}

export {
  validateParameters,
  getInitialPath,
  getThumbnailPath,
  isImageExists,
  createThumbnailPath,
  imageProcess,
}
