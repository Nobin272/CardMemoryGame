import { CARDS_CLICK, RESET_COUNTER, REFRESH_CARD } from '../utils/constants';

export const onCardClickAction = (card) => ({
  type: CARDS_CLICK,
  card
});

export const resetCardsClick = () => ({
  type: RESET_COUNTER
});

export const refreshCardAction = () => ({
  type: REFRESH_CARD
});
