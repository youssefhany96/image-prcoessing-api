import express from 'express'
import path from 'path'
import fs from 'fs'
import { imageProcess, validateParameters } from '../middlewares/image'

const routes = express.Router()
const port = 4000

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    `Image processing API can be accessed <a href="http://localhost:${port}/api">Here</a>`
  )
})

routes.get(
  '/api',
  imageProcess,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const query = req.query
    const { filename, height, width } = query
    const message = 'Please enter the valid query parameters of the image you want to resize'
    if (validateParameters(req)) {
      const newPath = path.resolve(
        __dirname,
        `../../assets/images/thumbnails/${width}-${height}-${filename}`
      )
      if (fs.existsSync(newPath)) {
        res.sendFile(newPath)
      } else {
        res.send(message)
      }
    } else {
      res.send(message)
    }  
  }
)

export default routes
