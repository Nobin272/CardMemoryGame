import * as actions from '../src/action/CardGameActions';
import * as constants from '../src/utils/constants';

describe('Testing actions of Memory Card Game', () => {
  it('Card click action', () => {
    const card = {
      id: 1,
      indexKey: 1 % constants.NO_CARD_ROW,
      number: 93,
      isFlipped: false, // true means visible number card
      canFlip: true
    };
    const expectedAction = {
      type: constants.CARDS_CLICK,
      card
    };
    expect(actions.onCardClickAction(card)).toEqual(expectedAction);
  });

  it('Reset Cards action', () => {
    const expectedAction = {
      type: constants.RESET_COUNTER
    };
    expect(actions.resetCardsClick()).toEqual(expectedAction);
  });

  it('Refresh Cards action', () => {
    const expectedAction = {
      type: constants.REFRESH_CARD
    };
    expect(actions.refreshCardAction()).toEqual(expectedAction);
  });
});
