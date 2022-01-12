import { Router } from 'express'
import { UsuariosController } from '../controllers/UsuariosController.js'
import { validatorMiddleware } from '../middlewares/validation.js'

const router = new Router()

export default router
    .post('/cadastrar', validatorMiddleware, UsuariosController.cadastrarUsuario)
    .post('/login', UsuariosController.loginUsuario)
    .get('/usuarios', UsuariosController.verUsuarios)
    .get('/usuario/:id', UsuariosController.verUsuario)