import { model } from '../models/index.js'
import jwt from 'jsonwebtoken'
 
export class UsuariosController {

    static async cadastrarUsuario(req, res) {
        const dadosUsuario = req.body
        const resultInsert = await model.Usuario.criarUsuario(dadosUsuario)
        return res.status(200).json(resultInsert)
    }

    static loginUsuario(req, res) {
        // apagar dps
        const payload = { id:1 }
        // criar token e salvar
        const token = UsuariosController._gerarToken(payload)
        res.status(200).cookie('access-token', 'Bearer ' + token).json({
            message: "Login efetuado com sucesso, voce agora tem permiçao para acessar os nosso serviços"
        })
    }

    static async verUsuarios(req, res) {
        const resultFind = await model.Usuario.listaUsuarios()
        return res.status(200).json(resultFind)
    }

    static async verUsuario(req, res) {
        /*
        let token = req.cookies['access-token']
        token = token.split(' ')[1]
        console.log(token)
        const id = UsuariosController._validaToken(token).id
        */
        const { id } = req.params
        const resultFind = await model.Usuario.algunsDadosUsuario(id)
        return res.status(200).json(resultFind)
    }

    static _gerarToken(payload) {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" })
    }

    static _validaToken(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}