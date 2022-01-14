import { Router } from 'express'
import { UsuariosController } from '../controllers/UsuariosController.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js'
import autorizationMiddleware from '../middlewares/autorizationMiddleware.js'

const router = new Router()

export default router
    .post('/cadastrar', validatorMiddleware, UsuariosController.cadastrarUsuario)
    .post('/login', autenticationMiddleware, UsuariosController.loginUsuario)
    .get('/logout', UsuariosController.logoutUsuario)
    .get('/usuario', autorizationMiddleware, UsuariosController.verUsuario)
    .get('/usuarios', autorizationMiddleware, UsuariosController.verUsuarios)
    .get('/usuario/:id', autorizationMiddleware, UsuariosController.verUsuario)
    