const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")

class UsersController {

  async create(request, response) {
    const { name, email } = request.body
    let { isAdmin } = request.body
    let { password } = request.body

    const [checkUserExist] = await knex("users").where({ email })

    if (checkUserExist) {
      throw new AppError("Este e-mail já esta em uso")
    }

    if (password.length < 6) {
      throw new AppError("Senha deve ter no mínimo 6 caracteres")
    }

    password = await hash(password, 8)
    isAdmin = isAdmin ?? false


    await knex("users").insert({
      name,
      email,
      password,
      admin: isAdmin
    })

    response.json()
  }

  async update(request, response) {
    const { old_password } = request.body
    let { name, email, password } = request.body
    const { id } = request.user

    let [user] = await knex("users").select([
      "id",
      "name",
      "email",
      "password"
    ]).where({ id })


    if (!user) {
      throw new AppError("Usuário não encontrado")
    }


    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }
      password = await hash(password, 8)
    }


    name = name ?? user.name
    email = email ?? user.email
    password = password ?? user.password

    const [userWithUpdatedEmail] = await knex("users").select("id").where({ email })
    if (userWithUpdatedEmail && (userWithUpdatedEmail.id != id)) {
      throw new AppError("Este e-mail já está em uso.")
    }



    await knex("users").where({ id }).update({
      name,
      email,
      password
    })

    return response.status(200).json()
  }

  async delete(request, response) {

    const {id}  = request.params
    console.log("a")

    await knex("users").where({id}).delete()    

    return response.json()
  }

}

module.exports = UsersController