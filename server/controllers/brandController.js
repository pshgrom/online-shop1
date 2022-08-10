const {Brand} = require('../models/models')

class BrandController {
    async create(req, res) {
        const {name} = req.body // получаем имя
        const brand = await Brand.create({name}) // заносим его в базу
        return res.json(brand) //возвращаем его на фронт
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()
