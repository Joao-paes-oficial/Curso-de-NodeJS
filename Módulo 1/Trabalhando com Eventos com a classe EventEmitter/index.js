const EventEmitter = require('events')
const { resolve } = require('path')
class MeuEmissor extends EventEmitter{

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, function(click){
    console.log('Um usuário clicou', click)
})

meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')


/* let count = 0

setInterval(() => {
    meuEmissor.emit(nomeEvento, 'no Ok')
    count++
}, 1000) */

const stdin = process.openStdin()

function main(){
    return new Promise((resolve, reject) => {
        stdin.addListener('data', (value) =>{
            //console.log(`Você digitou: ${value.toString().trim()}`)
            return resolve(value)
        })
    })
}

main().then((resultado) => {
    console.log('resultado', resultado.toString())
})


/* stdin.addListener('data', (value) => {
    console.log(`Você digitou: ${value.toString().trim()}`)
}) */ 

