import autenticationMiddleware from "./autenticationMiddleware.js"
import autorizationMiddleware from "./autorizationMiddleware.js"
import validatorMiddleware from "./validatorMiddleware.js"
import errorMiddleware from "./errorMiddleware.js"

export default {
    autenticate: autenticationMiddleware,
    autorizate: autorizationMiddleware,
    validate: validatorMiddleware,
    errors: errorMiddleware
}