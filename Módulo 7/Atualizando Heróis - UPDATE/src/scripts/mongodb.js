// Uso do docker

// Database
show dbs

// Mudando o contexto para um database
use herois

// Mostrar tables (colecoes)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

// Vai registrar 100000 itens no database
for(let i = 0; i <= 100000; i ++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
db.herois.update({ _id: ObjectId("") },
                 { $set: { nome: 'Mulher Maravilha' }})
                 // É necessário usar o $set para alterar somente o nome

//remove
db.herois.remove({}) //Vai remover todos os dados da tabela