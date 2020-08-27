import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Animated, StyleSheet
} from 'react-native';

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

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(animatedValue, {
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
    <TouchableOpacity onPress={() => isClicked(props.card)} style={styles.container}>
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.flipText}>
            {isFlipped === true ? number : '?'}
          </Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <Text style={styles.flipText}>
            {isFlipped === true ? number : '?'}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  flipCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    width: 90,
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Card;
