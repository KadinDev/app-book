import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 15px;
`;

export const Nome = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: #000;
`;

export const Preco = styled.Text`
    font-size: 17px;
    font-style: italic;
    font-weight: bold;
    color: #ff0000;
`;

export const CenterView = styled.View`
    flex-direction: row;
    margin-top: 15px;
    justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
    background-color: ${props => props.background};
    padding: 5px;
    margin-right: 15px;
    border-radius: 5px;
`;

export const BotaoText = styled.Text`
    color: #000;
    font-size: 18px;
    color: #fff;
`;