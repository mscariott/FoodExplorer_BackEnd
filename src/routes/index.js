const { Router } = require("express")

const usersRouter = require("./users.routes")
const ingridientsRouter = require("./ingridients.routes")
const dishesRouter = require("./dishes.routes")
const itensRouter = require("./itens.routes")
const sessionsRouter = require("./sessions.routes")
const favoritesRouter = require("./favorites.routes")



const routes = Router()

routes.use("/dishes", dishesRouter)
routes.use("/ingridients", ingridientsRouter)
routes.use("/users", usersRouter)
routes.use("/itens", itensRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/favorites", favoritesRouter)

module.exports = routes