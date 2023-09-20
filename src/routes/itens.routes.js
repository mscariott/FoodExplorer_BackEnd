const {Router} = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const itensRoutes = Router()

const ItensController = require("../controllers/itensController")
const itensController = new ItensController()

itensRoutes.use (ensureAuthenticated)

itensRoutes.post("/", itensController.create)
itensRoutes.get("/", itensController.index)


module.exports = itensRoutes

