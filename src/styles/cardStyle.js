import { StyleSheet } from 'react-native';

const cardStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'darkgray',
    margin: 5
  },
  flipCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#85C981',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: '#FA5965',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    width: 90,
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default cardStyle;
