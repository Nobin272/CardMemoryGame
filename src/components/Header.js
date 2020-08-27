import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import styles from '../styles/styles';

const Header = (props) => (
  <View style={styles.header}>
    <SafeAreaView>
      <Text style={styles.titleText}>{props.title}</Text>
    </SafeAreaView>
  </View>
);

export default Header;
