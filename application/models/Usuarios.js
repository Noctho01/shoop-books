import { Model } from 'sequelize'

export function Usuarios(sequelize, DataTypes) {
    class Usuario extends Model {
        
        static async listaUsuarios() {
            const resultFind = await Usuario.findAll({ attributes: ['id', 'primeiro_nome'] })
            return resultFind
        }

        static async algunsDadosUsuario(id) {
            const resultFind = await Usuario.findOne({attributes: ['primeiro_nome', 'segundo_nome', 'email', 'numero_telefone'] ,where: {id: id}})
            if(!resultFind) throw new Error('Usuario não encontrado')
            return resultFind
        }

        static async todosOsDados(id) {
            const resultFind = await Usuario.findOne({ where: { id: id } })
            if(!resultFind) throw new Error('Usuario não encontrado')
            return resultFind
        }

        static async criarUsuario(dados) {
            const resultInser = await Usuario.create(dados)
            return resultInser
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