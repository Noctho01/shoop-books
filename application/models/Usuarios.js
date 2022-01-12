import { Model } from 'sequelize'

export function Usuarios(sequelize, DataTypes) {
    class Usuario extends Model {
        
        static async listaUsuarios() {
            try {                
                const resultFind = await Usuario.findAll({ attributes: ['id', 'primeiro_nome'] })
                return resultFind
            } catch (error) {
                throw new Error('Os usuarios não foram encontrados')
            }
        }

        static async algunsDadosUsuario(id) {
            try {
                const resultFind = await Usuario.findOne({attributes: ['primeiro_nome', 'segundo_nome', 'email', 'numero_telefone'] ,where: {id: id}})
                if(!resultFind) throw new Error('Usuario não encontrado')
                return resultFind
            } catch (error) {
                console.error(error.message)
                throw new Error('Usuario não encontrado')
            }
        }

        static async todosOsDados(id) {
            try {
                const resultFind = await Usuario.findOne({ where: { id: id } })
                if(!resultFind) throw new Error('Usuario não encontrado')
                return resultFind
            } catch (error) {
                return error.message
            }
        }

        static async criarUsuario(dados) {
            try {
                const resultInser = await Usuario.create(dados)
                return resultInser
            } catch (error) {
                console.error(error.message)
                throw new Error('Usuario não foi criado')
            }
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