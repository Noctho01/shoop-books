import validator from 'validator'
import { ErrorsService } from '../errors/ErrorsService.js'
import { createHmac } from 'crypto'

export default (req, res, next) => {
    const dadosUsuario = req.body
    const nome = {
        primeiro : dadosUsuario.primeiro_nome.replace(/ /g,''),
        segundo : dadosUsuario.segundo_nome.replace(/ /g,'')
    }
    const errors = {}
    // tratando dados
    if (dadosUsuario.primeiro_nome) {
        dadosUsuario.primeiro_nome = validator.trim(dadosUsuario.primeiro_nome).toUpperCase()
        validator.isEmpty(nome.primeiro) ? errors.primeiro_nome = 'Campo obrigatorio' : null
        !validator.isAlpha(nome.primeiro) ? errors.primeiro_nome = 'Valor invalido' : null
    }
    if (dadosUsuario.segundo_nome) {
        dadosUsuario.segundo_nome = validator.trim(dadosUsuario.segundo_nome).toUpperCase()
        validator.isEmpty(nome.segundo) ? errors.segundo_nome = 'Campo obrigatorio' : null
        !validator.isAlpha(nome.segundo) ? errors.segundo_nome = 'Valor invalido' : null
    }
    if (dadosUsuario.cpf) {
        validator.isEmpty(dadosUsuario.cpf) ? errors.cpf = 'Compo obrigatorio' : null
        !ValidaCpf.validar(dadosUsuario.cpf) ? errors.cpf = 'Cpf invalido' : null
    }
    if (dadosUsuario.data_nascimento) {
        dadosUsuario.data_nascimento = validator.trim(dadosUsuario.data_nascimento)
        !validator.isDate(dadosUsuario.data_nascimento) ? errors.data_nascimento = 'Valor invalido, formato correto yyyy-mm-dd' : null
    }
    if (dadosUsuario.numero_telefone) {
        dadosUsuario.numero_telefone = validator.blacklist(validator.trim(dadosUsuario.numero_telefone),'\\(\\)\\-')
        !validator.isLength(dadosUsuario.numero_telefone, {min:11, max:11}) ? errors.numero_telefone = 'Valor invalido, o numero de telefone completo mais ddd possui 11 digitos' : null
    }
    if (dadosUsuario.email) {
        dadosUsuario.email = validator.trim(dadosUsuario.email)
        validator.isEmpty(dadosUsuario.email) ? errors.email = 'Campo obrigatorio' : null
        !validator.isEmail(dadosUsuario.email) ? errors.email = 'Email invalido' : null
    }
    if (dadosUsuario.senha) {
        dadosUsuario.senha = validator.trim(dadosUsuario.senha)
        validator.isEmpty(dadosUsuario.senha) ? errors.senha = 'Campo obrigatorio' : null
        !validator.isLength(dadosUsuario.senha, {min:6, max:20}) ? console.errors.senha = 'Senha deve possuir um valor de 6 a 20 caracteres' : null
    }

    if (Object.keys(errors).length > 0) throw new ErrorsService(errors, 402)
    
    dadosUsuario.senha = createHmac('sha256', process.env.SECRET)
        .update(dadosUsuario.senha)
        .digest('hex')
        
    req.user = dadosUsuario
    return next()
}

class ValidaCpf {

    static _validarDigitos(cpf, numChave) {
        const digito = cpf[numChave - 1]
        const noveDigitos = cpf.slice(0, numChave)
        let primeiroResult = 0
        let segundoResult = 0
        for (let num in noveDigitos) {
            let referencia = numChave - num
            if (referencia > 1) { 
                primeiroResult += noveDigitos[num] * referencia
            } else {
                segundoResult += (primeiroResult * 10) % 11
                break
            }
        }
        return segundoResult == digito
    }

   static _formatarCpf(cpf) {
        const trim = cpf.trim();
        const replace1 = trim.replace(/-|/g,'');
        const replace2 = replace1.replace(/\./g,'');
        const isInteger = parseInt(replace2) != 0 ? replace2 : false;
        return isInteger;
    }

    static validar(cpf) {
        const cpfFormatado = ValidaCpf._formatarCpf(cpf)
        if(!cpfFormatado) return false
        const ftDigito = ValidaCpf._validarDigitos(cpfFormatado, 10)
        const scDigito = ValidaCpf._validarDigitos(cpfFormatado, 11)
        return ftDigito && scDigito
    }
}