const assert = require('assert')
const api = require('./../api')
console.log(api)
let app = {}
describe.only('Suite de testes da API Herois', function() {
    this.beforeAll(async () => {
        app = await api
        
    })
    
    it('Listar /MeusHerois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/MeusHerois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /MeusHerois - Deve retornar somente os 10 registros', async () => {
        const TAMANHO_LIMITE = 10
        const result = await app.inject({
            method: 'GET',
            url: `/MeusHerois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar /MeusHerois - Deve retornar um erro com o limit incorreto', async () => {
        const TAMANHO_LIMITE = "AEEE"
        const result = await app.inject({
            method: 'GET',
            url: `/MeusHerois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const resultError = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"child \"limit\" fails because [\"limit\" must be a number]",
            "validation":{
                "source":"query",
                "keys":["limit"]
            }
        }   

        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(resultError))
        
    })

    it('Listar /MeusHerois - Deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000
        const NOME = "Homem Aranha-1622485341022"
        const result = await app.inject({
            method: 'GET',
            url: `/MeusHerois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NOME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NOME)
        
    })
})