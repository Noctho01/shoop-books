import { model } from '../models/index.js'

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


    static async verUsuarios(req, res) {
        try {
            const resultFind = await model.Usuario.listaUsuarios()
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async verUsuario(req, res) {
        const { id } = req.params
        try {
            const resultFind = await model.Usuario.algunsDadosUsuario(id)
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}