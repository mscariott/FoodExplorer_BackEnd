const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class IngridientsController {

  async create(request, response) {
    const ingridient = request.body
    const { name } = ingridient

    const [checkIngridientExist] = await knex("ingridients").where({ name })
    if (!checkIngridientExist) {
      await knex("ingridients").insert({
        name
      })
    }
    response.json()
  }


  async delete(request, response) {
    const { id } = request.params

    await knex("ingridients").where({ id }).delete();

    return response.json()
  }


}

module.exports = IngridientsController