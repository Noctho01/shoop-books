import { Router } from 'express'
import { UsuariosController } from '../controllers/UsuariosController.js'

const router = new Router()

export default router
    .post('/cadastrar', UsuariosController.cadastrarUsuario)
    .get('/usuarios', UsuariosController.verUsuarios)
    .get('/usuario/:id', UsuariosController.verUsuario)