
export default class BookSchema {
    static LivrosSchema = { //LivrosSchema tem que passar o mesmo nome no realm.js
        name: 'Book',
        primaryKey: 'id',
        properties: { //propriedades desse banco
            id: { type: 'int', indexed: true }, // int = integer
            nome: 'string', //nome do livro que será uma string
            preco: 'string',
        }
    };
    
}