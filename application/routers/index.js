import usuarioRouters from "./usuarioRouters.js"
import livroRouters from "./livroRouters.js"
import { errorMiddleware } from '../middlewares/errorMiddleware.js'

export default app => {
    app.use(
        usuarioRouters,
        livroRouters,
        errorMiddleware
        )
}