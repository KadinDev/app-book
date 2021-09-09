import Realm from 'realm';

//importa a configuração feita
import BookSchema from '../Schemas/BookSchema';

export function getRealm(){
    return Realm.open({
        // open, e carrega o BookSchema, se tivesse mais era só passar após a ,
        //LivrosSchema tem que ser o mesmo nome vindo do BookSchema realm.js
        LivrosSchema: [ BookSchema, ]
    });
}