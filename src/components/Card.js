import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import styles from '../../styles/styles'

const Card = (props) => {
    const isClicked = (card) => {
        console.log("Card clicked")
        props.onClick(card)
    }

    return(
        <TouchableOpacity onPress={() => isClicked(props.card)} style={{flex: 1, backgroundColor: 'lightGray', margin: 10}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.cardText}>{props.isFlipped ? "?" : props.number}</Text> 
            </View>
        </TouchableOpacity>
    )
}
export default Card