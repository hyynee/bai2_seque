import express from 'express'
import cors from 'cors'
import rootRouter from './routes/root-router.js'

const app = express()
app.use(express.json(), cors())
app.listen(4000)

app.use('/api', rootRouter)
