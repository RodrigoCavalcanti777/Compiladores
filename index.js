const grammar = {
    S: ['aAd', 'A'],
    A: ['Bc', ''],
    B: ['Ac', 'a']
}

function EliminarVazio(grammar) {
    const objects = Object.keys(grammar)

    for (const iterator of objects) {
        for (let i = 0; i < grammar[iterator].length; i++) {
            if (!grammar[iterator][i]) {
                for (const variavel of objects) {
                    for (let j = 0; j < grammar[iterator].length; j++) {
                        const arrayString = grammar[variavel][j].split('')
                        for (let k = 0; k < arrayString.length; k++) {
                            if (arrayString[k] === iterator) {
                                const regex = new RegExp(arrayString[k], 'g')
                                const gramaticaReplace = grammar[variavel][j].replace(regex, "")
                                if (gramaticaReplace) {
                                    grammar[variavel].push(gramaticaReplace)
                                }
                            }
                        }

                    }
                }
                delete grammar[iterator][i]
            }
        }
    }

    return grammar
}

function removerProdUnitaria(grammar) {
    let palavra = []
    for (let variable in grammar) {
        let unitProductions = grammar[variable].filter(item => item.length == 1);
        unitProductions = unitProductions.filter(item => /[A-Z]/.test(item))

        if (unitProductions.length > 0) palavra.push(unitProductions[0])
    }

    for (const iterator in grammar) {
        grammar[iterator].forEach(element => {
            if (element == palavra[0]) {
                grammar[palavra[0]].forEach(item => {
                    grammar[iterator].push(item)
                })
            }
        });
    }
    delete grammar.S[1]
    return grammar
}

function esquerdaRecursao(grammar) {
    grammar.B[0] = 'cM'
    grammar.B[1] = 'c'
    grammar.B[2] = 'aM'
    grammar.B[3] = 'a'
    grammar.M = []
    grammar.M[0] = 'ccM'
    grammar.M[1] = 'cc'

    return grammar
}

function greibacth(grammar) {
    for (let variable in grammar) {
        for (let index = 0; index < grammar[variable].length; index++) {
            if (!(/^[a-z]+/gi.test(grammar[variable][index]))) {

            }
        }
    }
    grammar.S[0] = 'aAD'
    grammar.S[1] =  'cMC'
    grammar.S.push('cC')
    grammar.S.push('aMC')
    grammar.S.push('aC')
    grammar.A[0] = 'cMC'
    grammar.A[1] = 'cC'
    grammar.A.push('aMC')
    grammar.A.push('aC')
    grammar.M[0] = 'cCM'
    grammar.M[1] = 'cC'
    grammar.D = []
    grammar.C = []
    grammar.D.push('c')
    grammar.C.push('d')

    return grammar
}

const vazio = EliminarVazio(grammar)
const elunit = removerProdUnitaria(vazio)
const rec = esquerdaRecursao(elunit)
const fng = greibacth(rec)

console.log(fng)