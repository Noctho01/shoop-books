import { Router } from 'express'
import controllers from './controllers/index.js'
import middlewares from './middlewares/index.js'

export const usuarioRouters = new Router()
export const livroRouters = new Router()

usuarioRouters
    .post('/cadastrar', middlewares.validate , controllers.Usuario.cadastrarUsuario)
    .post('/login', middlewares.autenticate, controllers.Usuario.loginUsuario)
    .get('/logout', controllers.Usuario.logoutUsuario)
    .get('/usuario', middlewares.autorizate, controllers.Usuario.verUsuario)
    .get('/usuarios', middlewares.autorizate, controllers.Usuario.verUsuarios)
    .get('/usuario/:id', middlewares.autorizate, controllers.Usuario.verUsuario)

livroRouters
    .get('/livros?', middlewares.autorizate, controllers.Livro.buscarLivros)
    .get('/livro/:id', middlewares.autorizate, controllers.Livro.buscarLivro)