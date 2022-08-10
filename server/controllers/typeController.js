const {Type} = require('../models/models')

class TypeController { // Создаем тип устройства
    async create(req, res) {
        const {name} = req.body // получаем имя
        const type = await Type.create({name}) // заносим его в базу
        return res.json(type) //возвращаем его на фронт
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()
