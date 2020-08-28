import reducer from '../src/reducer/CardGameReducer';
import { generateCards } from '../src/utils/utils';
import * as constants from '../src/utils/constants';

const cardData = generateCards();
const firstIndex = 0;
const secondIndex = 1;
const initialState = {
  counter: 0,
  canFlip: true, // For avoiding mutiple clicks
  isSuccessGuess: false,
  firstCard: null,
  secondCard: null,
  isCompleted: false,
  cards: cardData
};

const getCardClickedState = (index) => {
  cardData[index].isFlipped = true;
  initialState.counter += 1;
  initialState.firstCard = cardData[index];
  return initialState.isFlipped;
};

const isFirstTwoCardsAreSame = () => cardData[0].number === cardData[1].number;

const getSuccessState = () => {
  initialState.canFlip = false;
  initialState.firstCard = initialState.cards[firstIndex];
  initialState.secondCard = initialState.cards[secondIndex];
  initialState.isSuccessGuess = true;
  for (const card of initialState.cards) {
    card.isFlipped = true;
  }
  return initialState;
};

describe('Tests reducer for Memory Card game', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).counter).toEqual(
      0
    );
  });

  it('should get the first card clicked status', () => {
    expect(
      reducer(initialState, {
        type: constants.CARDS_CLICK,
        card: initialState.cards[firstIndex]
      }).isFlipped
    ).toEqual(
      getCardClickedState(firstIndex)
    );
  });

  it('should get the second card clicked status', () => {
    expect(
      reducer(initialState, {
        type: constants.CARDS_CLICK,
        card: initialState.cards[secondIndex]
      }).isFlipped
    ).toEqual(
      getCardClickedState(secondIndex)
    );
  });

  it('should get the isSuccessGuess status is true or false', () => {
    expect(
      reducer(initialState, {
        type: constants.CARDS_CLICK,
        card: cardData[secondIndex]
      }).isSuccessGuess
    ).toEqual(
      isFirstTwoCardsAreSame()
    );
  });

  it('should get the Complete status once refresh is complete', () => {
    expect(
      reducer(initialState, {
        type: constants.REFRESH_CARD
      }).isCompleted
    ).toEqual(
      false
    );
  });

  it('should Reset status once cards are reset', () => {
    expect(
      reducer(initialState, {
        type: constants.RESET_COUNTER
      }).counter
    ).toEqual(
      0
    );
  });

  it('should Set the all the cards to be flipped and see Refresh is working', () => {
    expect(
      reducer(getSuccessState(), {
        type: constants.REFRESH_CARD
      }).isCompleted
    ).toEqual(
      true
    );
  });
});
