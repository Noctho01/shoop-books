import { ErrorsService } from '../errors/ErrorsService.js'

export default (error, req, res, next) => {
    if (error instanceof ErrorsService) {
        return res
            .status(error.statusCode)
            .json({ status: "Erro", descrição: error.message })
    }
    console.log(error)
    return res
        .status(500)
        .json({ status: "Erro", descrição: error.message })
}