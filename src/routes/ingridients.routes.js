const {Router} = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const ingridientsRoutes = Router()

const IngridientsController = require("../controllers/ingridientsController")
const ingridientsController = new IngridientsController()

ingridientsRoutes.use(ensureAuthenticated)

ingridientsRoutes.post("/", ingridientsController.create)
ingridientsRoutes.delete("/:id", ingridientsController.delete)


module.exports = ingridientsRoutes

