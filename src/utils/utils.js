import { CARD_COUNT, NO_CARD_ROW } from './constants';
// Utility function to generate random numbers and cards

/** 
 * This function will used to generate a random Array
**/
export const randomArray = (array) => {
    // Shuffle array item and swap the elements
    for (let index = array.length - 1; index > 0; index--) {
        const savedIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[savedIndex]] = [array[savedIndex], array[index]];
    }
    return array;
}

/** 
 * This function will generate random numbers between 0 and 6
**/
export const randomNumbers = () => {
    const nums = new Set();
    // Only need to generate 6 unique random numbers between 1 and 100
    while(nums.size !== CARD_COUNT/2) {
        nums.add(Math.floor(Math.random() * 98) + 1);
    }
    // Duplicate and generate 12 digit arrays
    const cloneNums = [...nums];
    const numberArray = cloneNums.concat([...nums])
    console.log("Random array is: " + numberArray);
    return numberArray 
}

export const generateCards = () => {
    var index = 0
    // Generate the cards and duplicate items
    const random = randomArray(randomNumbers())
	const cards = [].slice.call(random).map(number => ({
            id: ++index,
            indexKey: index % NO_CARD_ROW,
			number: number,
			isFlipped: false,
			canFlip: true
        }));
    console.log("Cards array is: " + [...cards].toString());
	return randomArray(cards);
}