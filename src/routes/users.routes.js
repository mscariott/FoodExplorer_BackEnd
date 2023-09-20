const {Router} = require("express")


const usersRoutes = Router()


const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const UsersController = require("../controllers/usersController")
const usersController = new UsersController()


usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.delete("/:id", usersController.delete)


module.exports = usersRoutes

