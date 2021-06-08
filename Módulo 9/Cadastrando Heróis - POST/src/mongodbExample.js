const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost:27017/MeusHerois', 
                {useNewUrlParser: true}, function (error) {
                    if(!error) return;
                    console.log('Falha na conexão', error)
                })

const connection = Mongoose.connection

connection.once('open', () => console.log('database rodando!'))

setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
}, 1000)


/**
 *  State 0 -> Disconectado
 *  State 1 -> Conectado
 *  State 2 -> Conectando
 *  State 3 -> Disconectando
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('MeusHerois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('Result cadastrar', resultCadastrar)

    const listItens = model.find()
    console.log('List itens', listItens)
}

main()