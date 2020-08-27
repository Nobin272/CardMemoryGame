import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1
  },
  cardContainer: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#cacaca'
  },
  cardRow: {
    flex: 1,
    margin: 10,
    backgroundColor: '#cacaca'
  },
  // Score card style
  labelText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  scoreText: {
    fontSize: 30,
  },
  // Header Bar and Title style
  header: {
    padding: 20,
    backgroundColor: '#db656d'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10
  },
  // Button Style
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#06ba62',
    borderRadius: 10,
    margin: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});

export default styles;
