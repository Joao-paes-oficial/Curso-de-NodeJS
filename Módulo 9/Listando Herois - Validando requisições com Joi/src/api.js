const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/contextStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schema/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}



module.exports = main()