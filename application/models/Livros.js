import { Model } from 'sequelize'

export function Livros(sequelize, DataTypes) {
    class Livro extends Model {
        
        static async listaLivros() {
            try {
                const resultFind = await Livro.findAll( {attributes: ['id', 'nome']} )
                if (!resultFind) throw new Error('Não existe nenhum livro')
                return resultFind
            } catch (error) {
                console.error(error.message)
                throw new Error('Não foi possivel carregar os livros')
            }
        }

        static async buscarLivros(query) {
            try {
                const resultFind = await Livro.findAll({attributes: ['id', 'nome'], where: query })
                if (!resultFind) throw new Error('Livro(s) não encontrado(s)')
                return resultFind
            } catch (error) {
                console.error(error.message)
                throw new Error('Não foi possivel encontrar este(s) livro(s)')
            }
        }

        static async buscarLivro(id) {
            try {
                const resultFind = await Livro.findOne({ where: { id: id } })
                if (!resultFind) throw new Error('Livro não encontrado')
                return resultFind
            } catch (error) {
                console.error(error.message)
                throw new Error('Não foi possivel encontrar este livro')
            }
        }

    }
    
    Livro.init({
        nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descrição: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        preço: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Livros'
    })

    return Livro
}