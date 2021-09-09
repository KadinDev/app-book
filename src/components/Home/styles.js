import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #111;
    padding-top: 10px;
`;

export const Logo = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
`;

export const Title = styled.Text`
    font-size: 22px;
    margin-left: 15px;
    margin-top: 5px;
    color: #fff;
    margin-bottom: 4px;
`;
export const Input = styled.TextInput`
    height: 40px;
    margin-left: 15px;
    margin-bottom: 5px;
    margin-right: 15px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    font-size: 20px;
`;

export const CenterView = styled.View`
    flex-direction: row;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

export const Button = styled.TouchableOpacity`
    width: 150px;
    border-radius: 5px;
    background-color: ${ props => props.background };
    height: 40px;
    padding: 5px 0;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
`;

export const List = styled.FlatList.attrs({
    contentContainerStyle: {paddingHorizontal: 20},
    showVerticalScrollIndicator: false,
})`
    margin-top: 30px;
`;