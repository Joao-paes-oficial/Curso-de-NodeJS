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
        this._connect()
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
        this._herois = driver.define('MeusHerois', {
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
        await Herois.sync()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }

    _connect() {
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
    }
}

module.exports = Postgres