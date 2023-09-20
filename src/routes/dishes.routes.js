const { Router } = require("express")
const multer = require("multer")

const dishesRoutes = Router()

const uploadCOnfig = require("../configs/upload")
const upload = multer(uploadCOnfig.MULTER)

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const DishesAvatarController = require("../controllers/dishesAvatarController")
const dishesAvatarController = new DishesAvatarController()

const DishesController = require("../controllers/dishesController")
const dishesController = new DishesController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", upload.single("avatar"), dishesController.create)
dishesRoutes.put("/:id", dishesController.update)
dishesRoutes.delete("/:id", dishesController.delete)
dishesRoutes.get("/",dishesController.index)
dishesRoutes.get("/:id",dishesController.show)
dishesRoutes.patch("/avatar/:id", upload.single("avatar"), dishesAvatarController.update)


module.exports = dishesRoutes