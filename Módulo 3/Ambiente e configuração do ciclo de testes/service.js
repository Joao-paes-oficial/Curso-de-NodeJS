const {
    get
} = require('axios')

const URL = 'https://swapi.dev/api/people'

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(pessoa) {
    return {
        nome: pessoa.name,
        peso: pessoa.height
    }
}

module.exports = {
    obterPessoas
}