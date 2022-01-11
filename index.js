import {} from 'dotenv/config'
import server from './application/config/server.js'

server.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`)
})
