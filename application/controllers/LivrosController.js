import { model } from '../models/index.js'

export class LivrosController {

    static async buscarLivros(req, res, next) {
        const query = req.query
        let resultFind
        try {
            if (!query) resultFind = await model.Livro.listaLivros()
            else resultFind = await model.Livro.buscarLivros(query)
            return res.status(200).json(resultFind)
        } catch (error) {
            next(error)
        }
    }

    static async buscarLivro(req, res, next) {
        const { id } = req.params
        try {
            const resultFind = await model.Livro.buscarLivro(id)
            return res.status(200).json(resultFind)
        } catch (error) {
            next(error)
        }
    }
}