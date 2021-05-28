const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

describe('MongoDB Suite de testes', function() {
    this.beforeAll(async () => {
        await context.connect()
    })
    it('Verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })
})