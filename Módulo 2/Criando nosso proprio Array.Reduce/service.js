const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    
    return response.data
}

module.exports = {
    obterPessoas
}


/* obterPessoas('r2')
    .then((resultado) => {
        console.log('Resultado', resultado)
    })
    .catch((error) => {
        console.error('DEU RUIM', error)
    }) */