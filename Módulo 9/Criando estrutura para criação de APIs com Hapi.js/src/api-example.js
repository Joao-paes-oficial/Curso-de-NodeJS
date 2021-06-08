const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/contextStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schema/heroisSchema')


const app = Hapi.Server({
    port: 5000
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        {
            path: '/MeusHerois',
            method: 'GET',
            handler: (request, response) => {
                return context.read()
            }
        }
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
}

main()