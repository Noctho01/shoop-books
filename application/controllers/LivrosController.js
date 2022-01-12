import { model } from '../models/index.js'

export class LivrosController {

    static async verLivros(req, res) {
        try {
            const resultFind = await model.Livro.listaLivros()
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(erro.message)
        }
    }

    static async buscarLivros(req, res) {
        const query = req.query
        console.log(query)
        let resultFind
        try {
            if (!query) resultFind = await model.Livro.listaLivros()
            else resultFind = await model.Livro.buscarLivros(query)
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async buscarLivro(req, res) {
        const { id } = req.params
        try {
            const resultFind = await model.Livro.buscarLivro(id)
            return res.status(200).json(resultFind)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}