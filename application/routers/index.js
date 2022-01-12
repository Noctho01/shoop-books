import usuarioRouters from "./usuarioRouters.js"
import livroRouters from "./livroRouters.js"

export default app => {
    app.use(
        usuarioRouters,
        livroRouters
        )
}