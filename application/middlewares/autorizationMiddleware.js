import { ErrorsService } from "../errors/ErrorsService.js"
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    let token = req.cookies['access-token']
    if (token) token = token.split(/ /g)[1]
    if (!token) throw new ErrorsService('Voce precisa fazer login para acessar este serviço', 401)
    const payload = jwt.verify(token, process.env.SECRET)
    req.email = payload.email
    next()
}