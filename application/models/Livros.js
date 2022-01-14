import { Model } from 'sequelize'
import { ErrorsService } from '../errors/ErrorsService.js'

export function Livros(sequelize, DataTypes) {
    class Livro extends Model {
        
        static async listaLivros() {
            const resultFind = await Livro.findAll({ attributes: ['id', 'nome'] })
            if (!resultFind) throw new ErrorsService('Não existe nenhum livro', 404)
            return resultFind
        }


        static async buscarLivros(query) {
            Object.keys(query).forEach(chave => {
                const typeQuerys = ['genero', 'autor', 'preco', 'nome']
                if (!typeQuerys.find(item => item == chave)) throw new ErrorsService('Parametro de busca invalido', 402)
            })
            const resultFind = await Livro.findAll({
                attributes: ['id', 'nome'],
                where: query 
            })
            if (resultFind.length < 1) throw new ErrorsService('Livro(s) não encontrado(s)', 404)
            return resultFind
        }


        static async buscarLivro(id) {
            if (isNaN(id)) throw new ErrorsService('Informe um ID valido', 402)
            const resultFind = await Livro.findOne({ where: { id: id } })
            if (!resultFind) throw new ErrorsService('Livro não encontrado', 404)
            return resultFind
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