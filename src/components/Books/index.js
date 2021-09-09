import React from 'react';
import {View, Text} from 'react-native';

import {
    Container,
    Nome,
    Preco,
    CenterView,
    Botao,
    BotaoText,
} from './styles';

export function Books( { data, editar, delBook } ){
    return(
        <Container>
            <Nome> { data.nome } </Nome>
            <Preco> R$ {data.preco} </Preco>

            <CenterView>

                <Botao
                onPress={ () => editar(data)}//mando para esse editar todo o data(informações)
                // ae no index do Home vai ter acesso
                
                activeOpacity={0.8}
                background='#8a2be2'
                >
                    <BotaoText> Editar </BotaoText>
                </Botao>

                <Botao
                onPress={ () => delBook(data) }
                activeOpacity={0.8}
                background='#ff0000'
                >
                    <BotaoText> Excluir </BotaoText>
                </Botao>
            
            </CenterView>

        </Container>
    )
}