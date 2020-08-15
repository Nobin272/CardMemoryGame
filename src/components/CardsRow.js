import React from 'react'
import { View } from 'react-native'

import Card from './Card'

const CardsRow = (props) => {
    return(
        <View style= {{flex: 1, backgroundColor: "blue", margin: 10}}>
            {props.cards.map(card => <Card onClick={(card) => props.onClick(card)} card={card} isFlipped={card.isFlipped} key={card.id} {...card}/>)}
        </View>
    )
}
export default CardsRow