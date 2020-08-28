import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Animated
} from 'react-native';
import cardStyle from '../styles/cardStyle';

const Card = (props) => {
  const { isFlipped, number } = props;
  const [value, setValue] = useState(isFlipped === true ? 0 : 180);
  const animatedValue = new Animated.Value(value);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  useEffect(() => {
    flipCard();
  }, [value]);

  useEffect(() => {
    setValue(props.isFlipped === true ? 0 : 180);
  }, [isFlipped]);

  const flipCard = async () => {
    if (value >= 90) {
      await Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      await Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  };

  const isClicked = (card) => {
    props.onClick(card);
  };

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate }
    ]
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate }
    ]
  };

  return (
    <TouchableOpacity onPress={() => isClicked(props.card)} style={cardStyle.container}>
      <View>
        <Animated.View style={[cardStyle.flipCard, frontAnimatedStyle]}>
          <Text style={cardStyle.flipText}>
            {isFlipped === true ? number : '?'}
          </Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, cardStyle.flipCard, cardStyle.flipCardBack]}>
          <Text style={cardStyle.flipText}>
            {isFlipped === true ? number : '?'}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
