const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require('../providers/DiskStorage')

class DishesController {

  async create(request, response) {
    const { name, category, price, description, ingridients } = request.body
    const avatar = request.file;

    const [checkDishExist] = await knex("dishes").where({ name })

    if (checkDishExist) {
      throw new AppError("Este prato já existe")
    }

    const diskStorage = new DiskStorage()
    let filename

    if(avatar){
     filename = await diskStorage.saveFile(avatar.filename)
    } else {
      filename = null
    }

    const [dish_id] = await knex("dishes").insert(
      {
        name,
        category,
        price,
        description,
        avatar: filename 
      }
    )

    const arrIngredients = ingridients.split(",")
    if (arrIngredients.length) {
      const ingridientsInsert = arrIngredients.map(name => {
        return {
          dish_id,
          name
        }
      })
      await knex("ingridients").insert(ingridientsInsert)
    }
    response.json()

  }

  async update(request, response) {

    const { name, category, price, description, ingridients } = request.body
    const { id } = request.params

    let [dish] = await knex("dishes").select([
      "id",
      "category",
      "price",
      "description"
    ]).where({ id })


    if (!dish) {
      throw new AppError("Prato não encontrado")
    }


    const [dishWithUpdatedName] = await knex("dishes").select("name").where({ name })
    if (dishWithUpdatedName && (dishWithUpdatedName.name != name)) {
      throw new AppError("Este nome já esta em uso.")
    }

    await knex("dishes").where({ id }).update({
      name,
      category,
      price,
      description
    })

    const oldIngridients = await knex("ingridients").where({ dish_id: id })

    const deletedIngridients = oldIngridients.filter(old => !ingridients.find(ingridient => ingridient === old.name))

    const newIntegriends = ingridients.filter(ingredient => !oldIngridients.find(old => old.name === ingredient))

    if (deletedIngridients.length) {
      for (let ingridient of deletedIngridients) {
        await knex("ingridients").where({ id: ingridient.id }).delete()
      }
    }

    if (newIntegriends.length) {
      const ingridientsInsert = newIntegriends.map(name => {
        return {
          dish_id: id,
          name
        }
      })

      await knex("ingridients").insert(ingridientsInsert)
    }

    return response.status(200).json()
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()
    const ingridients = await knex("ingridients").where({ dish_id: id })

    return response.json(
      {
        dish,
        ingridients
      }
    )
  }


  async index(request, response) {

    const { name, category } = request.query

    let dishes

    if (name && category) {

      const dishesByIngridients = await knex("ingridients")
        .whereLike("ingridients.name", `%${name}%`)
        .where("dishes.category", category)
        .innerJoin("dishes", "ingridients.dish_id", "dishes.id")

      const dishesByName = await knex("dishes")
        .whereLike("dishes.name", `%${name}%`)
        .where("dishes.category", category)


      const joinDishes = dishesByIngridients.concat(dishesByName)

      const map = new Map()
      joinDishes.forEach(dish =>
        map.set(dish.id, dish)
      )
      dishes = Array.from(map.values())

      dishes.sort(function (a, b) {
        if (a.id < b.id) {
          return -1
        } else {
          return true
        }
      })

    }
    else {
      dishes = await knex("dishes")
        .where("category", category)
        .orderBy("category")
    }

    return response.json(dishes)
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete();

    return response.json()
  }
}

module.exports = DishesController