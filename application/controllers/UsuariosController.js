import { model } from '../models/index.js'
import { ErrorsService } from '../errors/ErrorsService.js'
import jwt from 'jsonwebtoken'
 
export class UsuariosController {

    static async cadastrarUsuario(req, res, next) {
        try {
            const dadosUsuario = req.body
            const resultInsert = await model.Usuario.criarUsuario(dadosUsuario)
            return res.status(200).json(resultInsert)
        } catch (error) {
            next(error)
        }
    }

    static loginUsuario(req, res, next) {
        const payload = { id:1 }
        const token = UsuariosController._gerarToken(payload)
        res.status(200).cookie('access-token', 'Bearer ' + token).json({
            message: "Login efetuado com sucesso, voce agora tem permiçao para acessar os nosso serviços"
        })
    }

    static async verUsuarios(req, res, next) {
        try {
            const resultFind = await model.Usuario.listaUsuarios()
            return res.status(200).json(resultFind)
        } catch (error) {
            next(error)
        }
    }

    static async verUsuario(req, res, next) {
        const { id } = req.params
        try {
            const resultFind = await model.Usuario.algunsDadosUsuario(id)
            return res.status(200).json(resultFind)
        } catch (error) {
            next(error)
        }
    }

    static _gerarToken(payload) {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" })
    }

    static _validaToken(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}