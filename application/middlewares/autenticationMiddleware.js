import { ErrorsService } from "../errors/ErrorsService.js"
import { model } from '../models/index.js'
import { createHmac  } from 'crypto'

export default async (req, res, next) => {
    try {
        const dadosUsuario = req.body
        const errors = {}
        !dadosUsuario.email ? errors.email = "Informe seu email para login" : null
        !dadosUsuario.senha ? errors.senha = "Informe sua senha para login" : null
        if (Object.keys(errors).length > 0) throw new ErrorsService(errors, 402)

        dadosUsuario.senha = createHmac('sha256', process.env.SECRET)
            .update(dadosUsuario.senha)
            .digest('hex')

        const result = await verificarDados(dadosUsuario)
        if (Object.keys(result). length > 0) throw new ErrorsService(result, 402)
        req.body = dadosUsuario.email
        next()
    } catch (error) {
        next(error)
    }
}

async function verificarDados(dados) {
    const errors = {}
    const user = await model.Usuario.findOne({ where: { email: dados.email } })
    if (!user) {
        errors.email = "Email ainda não cadastrado"
    } else if (user.senha != dados.senha) {
        errors.senha = "Senha incorreta"
    }
    return errors
}