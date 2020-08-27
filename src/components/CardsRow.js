import React from 'react';
import { View } from 'react-native';

import Card from './Card';

const CardsRow = (props) => {
  const renderCard = () => props.cards.map((cardItem) => <Card onClick={(card) => props.onClick(card)} card={cardItem} isFlipped={cardItem.isFlipped} key={cardItem.id} {...cardItem} />);

  return (
    <View style={{ flex: 1, margin: 10 }}>
      { renderCard() }
    </View>
  );
};

export default CardsRow;
