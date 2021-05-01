const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "Id do heroi")
        
        .option('-c, --cadastrar', "Cadastrar heroi")
        .option('-l, --listar', "Listar os herois")
        .option('-r, --remover', "Remover o heroi pelo ID")
        .option('-a, --atualizar [value]', "Atualizar o heroi pelo ID")
        .parse(process.argv)

        const option = Commander.opts()
        const heroi = new Heroi(option)
        
        try {
            if(option.cadastrar){
                delete heroi.id

                const resultado = await Database.cadastrar(heroi)
                if(!resultado) {
                    console.error('Heroi não foi cadastrado!')
                    return;
                }
                console.log('Heroi cadastrado com sucesso!')
            }

            if(option.listar){
                const resultado = await Database.listar()
                if(!resultado) {
                    console.error('Sem herois cadastrados!');
                    return;
                }
                console.log(resultado)
            }

            if(option.remover){
                const resultado = await Database.remover(heroi.id)
                if(!resultado) {
                    console.error('Não foi possivel remover o heroi.');
                    return;
                }
                console.log('Heroi removido com sucesso!')
            }

            if(option.atualizar){
                const idParaAtualizar = parseInt(option.atualizar);
                // Remover todas as chaves que estiverem com undefined | null
                const dado = JSON.stringify(heroi)
                const heroiAtualizar = JSON.parse(dado)
                const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
                if(!resultado){
                    console.error('Não foi possível atualizar o heroi.')
                    return;
                }
                console.log('Heroi atualizado com sucesso!')
            }

        } catch (error) {
            console.error('Deu Ruim', error)
        }
}

main()