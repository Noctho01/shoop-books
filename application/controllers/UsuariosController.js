import { model } from '../models/index.js'
import jwt from 'jsonwebtoken'
 
export class UsuariosController {

    static async cadastrarUsuario(req, res) {
        try {
            const dados = {
                segundo_nome: 'Dos Santos',
                cpf: '06700122112',
                data_nascimento: '1999-04-12',
                numero_telefone: '984518363',
                email: 'viniciuss@gmail.com',
                senha: 'minhaSenha'
            }
            const resultInsert = await model.Usuario.criarUsuario(dados)
            return res.status(200).json(resultInsert)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static loginUsuario(req, res) {
        // apagar dps
        const payload = { id:1 }
        try {
            // criar token e salvar
            const token = UsuariosController._gerarToken(payload)
            res.status(200).cookie('access-token', 'Bearer ' + token).json({
                message: "Login efetuado com sucesso, voce agora tem permiçao para acessar os nosso serviços"
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async verUsuarios(req, res) {
        try {
            const resultFind = await model.Usuario.listaUsuarios()
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async verUsuario(req, res) {
        /*
        let token = req.cookies['access-token']
        token = token.split(' ')[1]
        console.log(token)
        const id = UsuariosController._validaToken(token).id
        */
        const { id } = req.params
        try {
            const resultFind = await model.Usuario.algunsDadosUsuario(id)
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static _gerarToken(payload) {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" })
    }

    static _validaToken(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}