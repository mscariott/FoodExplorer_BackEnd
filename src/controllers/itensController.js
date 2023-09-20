const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class ItensController{

  async create(request, response) {
    const {quantity, id} = request.body
    const user_id = request.user.id

    await knex("itens").insert({
      user_id,
      quantity,
      dish_id: id
    })


    response.json()
  }

  async index(request, response) {
    const user_id = request.user.id

    const itens = await knex("itens").where({user_id})
    response.json(itens.length)
  }

  async delete(request, response) {
    const user_id = request.user.id



  }

}

module.exports = ItensController