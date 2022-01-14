import { Model } from 'sequelize'
import { ErrorsService } from '../errors/ErrorsService.js'

export function Usuarios(sequelize, DataTypes) {
    class Usuario extends Model {
        
        static async listaUsuarios() {
            const resultFind = await Usuario.findAll({ attributes: ['id', 'primeiro_nome'] })
            if(!resultFind) throw new ErrorsService('Lista de usuarios indisponivel', 404)
            return resultFind
        }

        static async algunsDadosUsuario(id) {
            Usuario._verificarId(id)
            const resultFind = await Usuario.findOne({attributes: ['primeiro_nome', 'segundo_nome', 'email', 'numero_telefone'], where: {id: parseInt(id)}})
            if(!resultFind) throw new ErrorsService('Usuario não encontrado', 404)
            return resultFind
        }

        static async todosOsDados(objId) {
            let parametroDeBusca
            console.log(objId)
            if (Object.keys(objId)[0] == 'id') {
                parametroDeBusca = {id: parseInt(objId)}
                Usuario._verificarId(parametroDeBusca.id)
            } else {
                parametroDeBusca = {email: objId}
            }
            const resultFind = await Usuario.findOne({ where: parametroDeBusca })
            if(!resultFind) throw new ErrorsService('id incorreto, este id não existe em nosso banco de dados', 402)
            return resultFind
        }

        static async criarUsuario(dados) {
            const resultFind = await Usuario.findAll()
            const errors = {}
            if(resultFind.find(item => item.email == dados.email)) errors.email = "Este email já está cadastrado"
            if(resultFind.find(item => item.cpf == dados.cpf)) errors.cpf = "Este cpf já está cadastrado"
            if(Object.keys(errors).length > 0) throw new ErrorsService(errors, 408)
            
            const resultInser = await Usuario.create(dados)
            if(!resultInser) throw new ErrorsService('usuario não foi criado', 500)
            return resultInser
        }

        static _verificarId(id) {
            if(isNaN(id)) throw new ErrorsService('Informe um ID valido', 402)
        }
    }

    Usuario.init({
        primeiro_nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        segundo_nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cpf: {
            type: DataTypes.CHAR(11),
            allowNull: false,
            unique: true
        },
        numero_telefone: {
            type: DataTypes.CHAR(11),
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.DATEONLY
        }
    },{
        sequelize,
        modelName: 'Usuarios'
    })

    return Usuario
}