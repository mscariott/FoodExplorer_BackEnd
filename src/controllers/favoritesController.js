const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FavoritesController {

  async create(request, response) {

    const user_id = request.user.id
    const {dish_id} = request.query
   
    
    const alredyExist = await knex("favorites").where({user_id}).where({dish_id})


    if (!alredyExist.length) {
    await knex("favorites").insert({
      user_id,
      dish_id
    })
    }

    response.json()

  }

  async delete(request, response) {

    const user_id = request.user.id
    const {dish_id} = request.query

    await knex("favorites").where({ user_id }).where({dish_id}).delete()

    response.json()

  }

  async show(request, response) {

    const user_id = request.user.id

    const favorites = await knex("favorites").where({ user_id })

    response.json(favorites)

    return(favorites)
  }



}

module.exports = FavoritesController