const { Router } = require("express")
const fasvoritesRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const FavoritesController = require("../controllers/favoritesController")
const favoritesController = new FavoritesController()

fasvoritesRoutes.use(ensureAuthenticated)

fasvoritesRoutes.post("/", favoritesController.create)
fasvoritesRoutes.delete("/", favoritesController.delete)
fasvoritesRoutes.get("/", favoritesController.show)

module.exports = fasvoritesRoutes