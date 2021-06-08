const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute{
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/MeusHerois',
            method: 'GET',
            config: {
                validate: {
                    //payload -> body
                    //headers -> head
                    //params -> na URL :id
                    //query -> ?skip=0&limit=100
                    failAction : (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            }, 
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    const query = { nome : { $regex: `.*${nome}*` } } 

                    return this.db.read(nome ? query : {}, skip, limit)

                } catch(error) {
                    console.log('Deu ruim', error)
                    return 'Erro interno no servidor'
                }
            }
        }
    }
}

module.exports = HeroRoutes