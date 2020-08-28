import React, { useEffect } from 'react';
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

const CardGameApp = () => {
  const cardData = useSelector((state) => state);
  const dispatch = useDispatch();

  const cardClicked = (card) => dispatch(onCardClickAction(card));
  const resetClicked = () => dispatch(resetCardsClick());
  const refreshAction = () => dispatch(refreshCardAction());

  const onCardClicked = (card) => {
    cardClicked(card);
    // Verify the cards after 1 seconds - To refresh
    setTimeout(() => {
      refreshAction();
    }, 1000);
  };

  useEffect(() => {
    if (cardData.isCompleted === true) {
      showAlert('CONGRATS!', `You have successfully completed in ${cardData.counter} steps. Do you want to try again?`, resetClicked);
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
    <>
      <Header title="CARD GAME APP" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.labelText}>
          {'STEPS: '}
          <Text style={styles.scoreText}>{cardData.counter}</Text>
        </Text>
        <View style={styles.cardContainer}>
          {renderCardData()}
        </View>
        <GameAppButton onPress={() => resetClicked()} title="RESTART" />
      </SafeAreaView>
    </>
  );
};

export default CardGameApp;
