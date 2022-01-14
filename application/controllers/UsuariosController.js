import { model } from '../models/index.js'
import jwt from 'jsonwebtoken'
 
export class UsuariosController {

    static async cadastrarUsuario(req, res, next) {
        try {
            const dadosUsuario = req.user
            const resultInsert = await model.Usuario.criarUsuario(dadosUsuario)
            return res
                .status(201)
                .json(resultInsert)
        } catch (error) {
            next(error)
        }
    }

    static loginUsuario(req, res) {
        const payload = { email: req.body }
        const token = gerarToken(payload)
        return res
            .status(201)
            .cookie('access-token', 'Bearer ' + token)
            .json({ message: "Login efetuado com sucesso, voce agora tem permiçao para acessar os nosso serviços" })
    }

    static logoutUsuario(req, res) {
        if (!req.cookies['access-token']) return res
            .status(202)
            .json({ message: "Voce já está desconectado" })
        return res
            .status(202)
            .clearCookie('access-token')
            .json({ message: "Usuario foi desconectado" })
    }

    static async verUsuarios(req, res, next) {
        try {
            const resultFind = await model.Usuario.listaUsuarios()
            return res
                .status(200)
                .json(resultFind)
        } catch (error) {
            next(error)
        }
    }

    static async verUsuario(req, res, next) {
        const id = req.params.id
        const email = req.email
        let resultFind
        try {
            if (!id) resultFind = await model.Usuario.todosOsDados(email)
            else resultFind = await model.Usuario.algunsDadosUsuario(id)
            return res
                .status(200)
                .json(resultFind)
        } catch (error) {
            next(error)
        }
    }
}

function gerarToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" })
}