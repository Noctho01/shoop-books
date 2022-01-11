import cookieParser from 'cookie-parser'

export default (app, express) => {
    app.use(cookieParser())
    app.use(express.urlencoded({ extends: false }))
    app.use(express.json())
}