import express from 'express'
import configurarApp from './configApp.js'
import iniciarRotas from '../routers/index.js'
const app = express()

configurarApp(app, express)
iniciarRotas(app)

export default app