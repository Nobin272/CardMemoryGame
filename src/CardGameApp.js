import React, { useEffect } from 'react';
import {
  View, SafeAreaView, Text, Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CardsRow from './components/CardsRow';
import styles from '../styles/styles';
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
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.cardText}>
          {' '}
          Number of steps:
          {cardData.counter}
        </Text>
        <View style={{
          margin: 10,
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#cacaca'
        }}
        >
          {renderCardData()}
        </View>
        <Button onPress={() => resetClicked()} title="RESET" />
      </SafeAreaView>
    </>
  );
};

export default CardGameApp;
