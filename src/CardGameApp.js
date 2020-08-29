import React, { useContext, useEffect } from 'react';
import {
  View, SafeAreaView, Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CardsRow from './components/CardsRow';
import Header from './components/Header';
import GameAppButton from './components/GameAppButton';
import styles from './styles/styles';

import { onCardClickAction, resetCardsClick, refreshCardAction } from './action/CardGameActions';
import { groupBy, showAlert } from './utils/utils';
import { LocalizationContext, LocalizationProvider } from '../locales/translations';

const CardGameApp = () => {
  const cardData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { translations, initializeAppLanguage } = useContext(LocalizationContext);

  const cardClicked = (card) => dispatch(onCardClickAction(card));
  const resetClicked = () => dispatch(resetCardsClick());
  const refreshAction = () => dispatch(refreshCardAction());

  initializeAppLanguage();
  const onCardClicked = (card) => {
    cardClicked(card);
    // Verify the cards after 1 seconds - To refresh
    setTimeout(() => {
      refreshAction();
    }, 1000);
  };

  useEffect(() => {
    initializeAppLanguage();
  }, []);

  useEffect(() => {
    if (cardData.isCompleted === true) {
      const message = translations.formatString(translations.SuccessfullyCompleted, { steps: cardData.counter, }) + translations.TryAgainQuestion;
      showAlert(translations.Congrats, message, resetClicked);
    }
  }, [cardData.isCompleted]);

  // Utility function to group cards into Rows
  const renderCardData = () => {
    const grouped = groupBy(cardData.cards);
    return Object.keys(grouped).map((key) => {
      const value = grouped[key];
      return <CardsRow onClick={(card) => onCardClicked(card)} cards={value} key={key} />;
    });
  };

  return (
    <LocalizationProvider>
      <Header title={translations.MemoryCardGame} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.labelText}>
          {translations.Steps}
          <Text style={styles.scoreText}>{cardData.counter}</Text>
        </Text>
        <View style={styles.cardContainer}>
          {renderCardData()}
        </View>
        <GameAppButton onPress={() => resetClicked()} title={translations.Restart} />
      </SafeAreaView>
    </LocalizationProvider>
  );
};

export default CardGameApp;
