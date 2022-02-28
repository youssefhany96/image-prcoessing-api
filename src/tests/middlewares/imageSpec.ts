import path from 'path'

import {
  getInitialPath,
  getThumbnailPath,
  isImageExists,
  createThumbnailPath,
} from '../../middlewares/image'

describe('Test steps of Image Processing', (): void => {
  it('should ensure the type every path is string', (): void => {
    expect(getInitialPath('encenadaport')).toBeInstanceOf(String)
    expect(getThumbnailPath('400-400-encenadaport.jpg')).toBeInstanceOf(String)
  })
  it('should ensure the exictence of image returns boolean', async (): Promise<void> => {
    expect(await isImageExists('encenadaport.jpg')).toBeInstanceOf(Boolean)
  })
  it('should ensure each path points to the correct file', (): void => {
    expect(getInitialPath('encenadaport.jpg')).toContain(
      path.resolve(__dirname, '../../../assets/images/encenadaport.jpg')
    )
    expect(getThumbnailPath('400-400-encenadaport.jpg')).toContain(
      path.resolve(
        __dirname,
        '../../../assets/images/thumbnails/400-400-encenadaport.jpg'
      )
    )
  })
  it('should ensure sharp is recieving the expected parameters', async (): Promise<void> => {
    expect(
      await createThumbnailPath(200, 200, 'encenadaport.jpg')
    ).not.toBeNull()
  })
})
