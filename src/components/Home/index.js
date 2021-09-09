import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import {
    Container,
    Logo,
    Title,
    Input,
    CenterView,
    Button,
    ButtonText,
    List
} from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Books } from '../Books';

import { getRealm } from '../../services/realm'

export function Home(){

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [idEdit, setIdEdit] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(false)

    const [books, setBooks] = useState([]);


    // carregando os livros salvos
    useEffect( ()=> {
        loadBooks = async() => {
            //abrir a conexão
            const realm = await getRealm();

            //buscar os items
            const data = realm.objects('Book');
            
            setBooks(data); //e já passa para o setBooks
        }

        loadBooks();
    },[])
    
    //salvando no banco os livros
    async function saveBook (data) {
        const realm = await getRealm(); //abrindo conexão

        //pegar todos os items ordenados por id em ordem decrescente(true)
        //forma de criar ids únicos para cada item.
        const id = realm.objects('Book').sorted('id', true).length > 0
        ? realm.objects('Book').sorted('id', true)[0].id + 1 : 1;

        const dadosLivro = {
            id: id, // recebe o id único criado acima
            nome: data.nome,
            preco: data.preco
        }

        //realm.write = escrever, vai escrever salvando no banco
        realm.write(()=>{
            realm.create('Book', dadosLivro )
        });
    }

    // adicionando os livros para salvar no banco
    async function addBooks() {
        if (nome === '' || preco === ''){
            alert('Não deixa campos vazaios');
            return;
        }

        try{
            const data = { nome: nome, preco: preco };
            await saveBook(data); //chegar aqui chama o sabeBook acima e passa esse data
            //criado acima desse saveBook
            console.log(data)
            setNome('');
            setPreco('');
            Keyboard.dismiss();
        
        } catch (err){
            alert(err)
        }

    }

    function editarBook(data){//agora recebo o data que mandei de volta no
        // botao editar do index do Books
        //essa função é para quando eu clicar em editar os inputs receberem o mesmo valor do item(livro)
        setNome(data.nome);
        setPreco(data.preco);
        setIdEdit(data.id); //passa o id

        setDisabledBtn(true);
    }

    //vai no banco e vai editar exatamente somente o item que estou clicando
    async function editBook(){
        if( idEdit === null ){ //não clicou em editar nenhum item
            alert('Você não pode editar')
            return;
        }

        const realm = await getRealm(); //abrir conexão;

        const response = {
            id: idEdit, //o id que cliquei está em idEdit
            nome: nome, // o nome que digitei
            preco: preco, // o preco que digitei
        };

        await realm.write(()=>{
            realm.create('Book', response, 'modified' )
            // modifed acima vai informar que já está escrevendo em um id que já existe,
            //e ele vai fazer modificar, a atualização dos item desse id
        });

        //atualizar a lista após a edição
        // false no final informa que não quero em ordem decrescente a lista
        const dadosAlterados = await realm.objects('Book').sorted('id', false);

        setBooks(dadosAlterados);
        setNome('');
        setPreco('');
        setIdEdit(null);
        setDisabledBtn(false);
        Keyboard.dismiss();
    }

    //excluir Book
    async function deleteBook(data){
        const realm = await getRealm();
        const ID = data.id; //recebe o id do item clicado

        realm.write(()=>{
            //vai no BD procurar um id igual ao que estamos pegando no ID
            if(realm.objects('Book').filtered( 'id=' + ID ).length > 0 ) {
                realm.delete(
                    realm.objects('Book').filtered('id =' + ID ) //deletar somente o item com o ID passado acima
                )
            }  
        })

        // false, organiza na ordem crescente
        const livrosAtuais = await realm.objects('Book').sorted('id', false );

        setBooks(livrosAtuais); //agora passa todos os livros menos o livro deletado,
        //e já chama em tela
    }

    return (
        <Container>
        <Logo> I <MaterialIcons name='favorite' size={30} color='#ff0000' /> Books </Logo>

        <Title>Nome</Title>
        
        <Input 
        autoCapitalize="none" 
        autoCorrect={false} 
        value={nome}
        onChangeText={ (text ) => setNome(text)}
        />

        <Title>Preço</Title>
        
        <Input
        value={preco}
        onChangeText={ (number ) => setPreco(number)}
        autoCapitalize="none" 
        autoCorrect={false} 
        keyboardType="numeric"
        />

        <CenterView>

            <Button
            onPress={ addBooks }
            
            disabled={disabledBtn} //botão clicavel ou nao
            style={{ opacity: disabledBtn ? 0.5 : 1 }}
            activeOpacity={0.8}
            background='#8a2be2'
            >
                <ButtonText> Cadastrar </ButtonText>
            </Button>

            <Button
            onPress={ editBook }
            activeOpacity={0.8}
            background='#ff0000'
            >
                <ButtonText> Editar </ButtonText>
            </Button>

        </CenterView>

        <List 
        data={books}
        keyboardShouldPersistTaps='handled' //se eu abrir o teclado e clicar na lista o teclado via fechar
        
        keyExtractor={ item => String(item.id) }
        renderItem={ ({item}) => ( <Books data={item} editar={editarBook} delBook={deleteBook} /> ) }
        />

        </Container>
    );
};
