const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require('sequelize')
const driver = new Sequelize(
    'MeusHerois',   //Database
    'postgres',     //Usuário
    'BLABLABLA12',   //Senha
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        }
        catch(error) {
            console.log('Fail!', error)
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.nome, schema.schema, schema.options
        )
        await model.sync()

        return model
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._schema.findAll({ where: item, raw: true })
        return result
    }

    async update(id, item) {
        const result = await this._schema.update(item, { where: {id: id} })
        return result
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({ where: query })
    }

    static async connect() {
        const connection = new Sequelize(
            'MeusHerois',   //Database
            'postgres',     //Usuário
            'BLABLABLA12',   //Senha
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection
    }
}

module.exports = Postgres