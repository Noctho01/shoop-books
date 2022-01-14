import express from 'express'
import cookieParser from 'cookie-parser'
import middlewares from './middlewares/index.js'
import { usuarioRouters, livroRouters } from "./routers.js"

const app = express()
// Configurando app
    app.use(cookieParser())
    app.use(express.urlencoded({ extends: false }))
    app.use(express.json())
// Setando rotas
    app.use(usuarioRouters)
    app.use(livroRouters)
// Setando Middlewares
    app.use(middlewares.errors)

export default app