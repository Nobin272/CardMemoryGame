/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux'
import { cardStore } from './src/store/CardGameStore';
import CardGameApp from './src/CardGameApp';

const App = () => {
  return(
    <Provider store={cardStore}>
      <CardGameApp />
    </Provider>
  )
}
export default App;
