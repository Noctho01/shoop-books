import { Sequelize } from 'sequelize'
import { Usuarios } from './Usuarios.js'
import { Livros } from './Livros.js'


const config = {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASS,
    host: process.env.HOST,
    dialect: process.env.DIALECT
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    define: { freezeTableName: true, timestamps: false }
})

export const model = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    Usuario: Usuarios(sequelize, Sequelize.DataTypes),
    Livro: Livros(sequelize, Sequelize.DataTypes)
}