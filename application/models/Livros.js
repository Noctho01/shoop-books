import { Model } from 'sequelize'

export function Livros(sequelize, DataTypes) {
    class Livro extends Model {
        
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