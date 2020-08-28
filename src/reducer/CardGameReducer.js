import { CARDS_CLICK, RESET_COUNTER, REFRESH_CARD } from '../utils/constants';
import { generateCards } from '../utils/utils';

const initialState = {
  counter: 0,
  canFlip: true, // For avoiding mutiple clicks
  isSuccessGuess: false,
  firstCard: null,
  secondCard: null,
  isCompleted: false,
  cards: [...generateCards()]
};

/* Internal functions  */
const setCardIsFlipped = (state, cardID, isFlipped) => {
  state.cards = state.cards.map((c) => {
    if (c.id !== cardID) return c;
    return { ...c, isFlipped };
  });
};
const setCardCanFlip = (state, cardID, canFlip) => {
  state.cards = state.cards.map((c) => {
    if (c.id !== cardID) return c;
    return { ...c, canFlip };
  });
};

const onSuccessGuess = (state) => {
  setCardCanFlip(state, state.firstCard.id, false);
  setCardCanFlip(state, state.secondCard.id, false);
  setCardIsFlipped(state, state.firstCard.id, true);
  setCardIsFlipped(state, state.secondCard.id, true);

  state.canFlip = false;
  state.isSuccessGuess = true;
};
const onFailureGuess = (state) => {
  state.canFlip = false;
  state.isSuccessGuess = false;
};

const resetFirstAndSecondCards = (state) => {
  state.firstCard = null;
  state.secondCard = null;
};

const checkForCompletion = (state) => {
  for (const card of state.cards) {
    if (card.isFlipped === false) {
      return false;
    }
  }

  return true;
};

/* This function will check the cards are refreshed correctly based od isSuccessGuess */
const refreshCards = (state) => {
  if (!state.firstCard || !state.secondCard) return;
  if (state.canFlip === false) {
    state.canFlip = true;
    const firstCardID = state.firstCard.id;
    const secondCardID = state.secondCard.id;

    setCardIsFlipped(state, secondCardID, state.isSuccessGuess);
    setCardIsFlipped(state, firstCardID, state.isSuccessGuess);
    resetFirstAndSecondCards(state);
    state.isCompleted = checkForCompletion(state);
  }
};

/* This function will handle CArd clicked button action */
const onCardClicked = (card, state) => {
  if (!state.canFlip) return;
  if (!card.canFlip) return;
  // Clicking on same card
  const isFirstCard = state.firstCard && (card.id === state.firstCard.id);
  const isSecondCard = state.secondCard && (card.id === state.secondCard.id);
  if (isFirstCard || isSecondCard) { return; }

  setCardIsFlipped(state, card.id, true);
  if (state.firstCard) {
    state.secondCard = card;
  } else {
    state.firstCard = card;
  }

  // Increase the counter
  state.counter += 1;

  if (!state.firstCard || !state.secondCard) return;
  if (state.firstCard.number === state.secondCard.number) {
    onSuccessGuess(state);
  } else {
    onFailureGuess(state);
  }
};

/* Reducer for the CardGameApp
 * This will handle all the defined application actions
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CARDS_CLICK:
      onCardClicked(action.card, state);
      return { ...state };
    case RESET_COUNTER:
      return {
        counter: 0,
        canFlip: true, // For avoiding mutiple clicks
        isSuccessGuess: false,
        firstCard: null,
        secondCard: null,
        isCompleted: false,
        cards: [...generateCards()]
      };
    case REFRESH_CARD:
      refreshCards(state);
      return { ...state };

    default:
      return { ...state };
  }
};

export default reducer;
