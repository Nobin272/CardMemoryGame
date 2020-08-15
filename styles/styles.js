import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        flexDirection: 'row'
    },
    cardRow: {
        flex: 1, 
        backgroundColor: "blue", 
        margin: 10
    },
    cardView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FA5965',
        height: '80%',
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    frontView: {
        backgroundColor: '#85C981',
    },
    backView: {
        backgroundColor: '#FA5965',
    },
    cardText: {
        fontSize: 36,
    },
    cardRow: {
        flexDirection: 'row',
        backgroundColor: "grey",
        borderRadius: 5,
    },
});

export default styles;