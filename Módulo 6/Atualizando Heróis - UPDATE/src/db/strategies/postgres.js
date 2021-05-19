const ICrud = require('../strategies/interfaces/interfaceCrud')
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
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        }
        catch(error) {
            console.log('Fail!', error)
            return false;
        }
    }

    async defineModel() {
        this._herois = this._driver.define('MeusHerois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._herois.findAll({ where: item, raw: true })
        return result
    }

    async update(id, item) {
        const result = await this._herois.update(item, { where: {id: id} })
        return result
    }

    async connect() {
        this._driver = new Sequelize(
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
        await this.defineModel()
    }
}

module.exports = Postgres