import { Router } from 'express'
import { LivrosController } from '../controllers/LivrosController.js'

const router = new Router()

export default router
    .get('/livros?', LivrosController.buscarLivros)
    .get('/livro/:id', LivrosController.buscarLivro)
    