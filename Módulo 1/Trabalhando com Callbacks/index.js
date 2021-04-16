/*Obter um usuário
preciso obter o numero de telefone do usuário apartir do seu id
Obter o indereço do usuário apatir do seu id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null, {
            id : 1,
            nome : 'Aladin',
            dataNascimento : new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            telefone : '999999999',
            ddd : 22
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua : 'dos bobos',
            numero : 0
        })
    }, 2000);
}

function resolverUsuario(error, usuario){
    console.log('Usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0 === false
    if(error){
        console.error('DEU RUIM em USUARIO', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error('DEU RUIM em TELEFONE', error1)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.error('DEU RUIM em ENDEREÇO', error2)
                return;
            }

            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})