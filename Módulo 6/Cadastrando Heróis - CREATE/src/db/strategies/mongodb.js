const ICrud = require('../strategies/interfaces/interfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB