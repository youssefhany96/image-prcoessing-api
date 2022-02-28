import express from 'express'
import routes from './routes'

const app = express()
const port = 4000

app.use('/', routes)
app.use('/api', routes)

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})

export default app
