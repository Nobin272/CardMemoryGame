import { Alert } from 'react-native';
import { CARD_COUNT, NO_CARD_ROW } from './constants';
// Utility function to generate random numbers and cards

/**
 * This function will used to generate a random Array
* */
export const randomArray = (array) => {
  // Shuffle array item and swap the elements
  for (let index = array.length - 1; index > 0; index -= 1) {
    const savedIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[savedIndex]] = [array[savedIndex], array[index]];
  }
  return array;
};

/**
 * This function will generate random numbers between 0 and 6
* */
export const randomNumbers = () => {
  const nums = new Set();
  // Only need to generate 6 unique random numbers between 1 and 100
  while (nums.size !== CARD_COUNT / 2) {
    nums.add(Math.floor(Math.random() * 99) + 1);
  }
  // Duplicate and generate 12 digit arrays
  const cloneNums = [...nums];
  const numberArray = cloneNums.concat([...nums]);
  return numberArray;
};

export const generateCards = () => {
  let index = 0;
  // Generate the cards and duplicate items
  const random = randomArray(randomNumbers());
  const cards = [].slice.call(random).map((number) => ({
    id: index += 1,
    indexKey: index % NO_CARD_ROW,
    number,
    isFlipped: false, // true means visible number card
    canFlip: true
  }));
  return randomArray(cards);
};

export const groupBy = (array) => array.reduce((result, currentValue) => {
  (result[currentValue.indexKey] = result[currentValue.indexKey] || []).push(
    currentValue
  );
  return result;
}, {});

export const showAlert = (title, message, action) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      { text: 'TRY AGAIN', onPress: () => action() }
    ],
    { cancelable: false }
  );
};
