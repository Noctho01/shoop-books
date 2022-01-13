import express from 'express'
import cookieParser from 'cookie-parser'

// importando rotas
import usuarioRouters from "../routers/usuarioRouters.js"
import livroRouters from "../routers/livroRouters.js"
import errorMiddleware from '../middlewares/errorMiddleware.js'

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extends: false }))
app.use(express.json())

// Setando rotas
app.use(usuarioRouters)
app.use(livroRouters)

// Setando Middlewares
app.use(errorMiddleware)

export default app