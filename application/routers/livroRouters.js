import { Router } from 'express'
import { LivrosController } from '../controllers/LivrosController.js'
import autorizationMiddleware from '../middlewares/autorizationMiddleware.js'

const router = new Router()

export default router
    .get('/livros?', autorizationMiddleware, LivrosController.buscarLivros)
    .get('/livro/:id', autorizationMiddleware, LivrosController.buscarLivro)
    