import {} from 'dotenv/config'
import server from './application/server.js'

server.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`)
})
