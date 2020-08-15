import { View, SafeAreaView, Text, Button } from "react-native";
import CardsRow from './components/CardsRow';
import React, {useEffect, useState, Component} from "react";
import { useSelector, useDispatch } from 'react-redux'
import styles from "../styles/styles";
import { onCardClickAction, resetCardsClick, refreshCardAction } from "./action/CardGameActions";
import { generateCards } from "./utils/utils";

const CardGameApp = () => {
    const cardData = useSelector(state => state)
    const dispatch = useDispatch()
    const cardLoaded = generateCards()

    const [canFlip, setCanFlip] = useState(false)
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [cards, setCards] = useState(cardLoaded)

    const cardClicked = card => dispatch(onCardClickAction(card))
    const resetClicked = () => {
        resetFirstAndSecondCards();
        setCards(generateCards());
        dispatch(resetCardsClick());
    } 

    function setCardIsFlipped(cardID, isFlipped) {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
            return {...c, isFlipped};
        }));
    }
    function setCardCanFlip(cardID, canFlip) {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
            return {...c, canFlip};
        }));
    }
    
    function resetFirstAndSecondCards() {
        setFirstCard(null);
        setSecondCard(null);
    }
    
    function onSuccessGuess() {
        setCardCanFlip(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardIsFlipped(firstCard.id, false);
        setCardIsFlipped(secondCard.id, false);
        resetFirstAndSecondCards();
    }
    function onFailureGuess() {
        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;
    
        setTimeout(() => {
            setCardIsFlipped(firstCardID, true);
        }, 1000);
        setTimeout(() => {
            setCardIsFlipped(secondCardID, true);
        }, 1200);
    
        resetFirstAndSecondCards();
    }

    function onCardClicked(card) {
        console.log("Card clicked: " + card.number)
        
        cardClicked(card)
        if (!canFlip)
            return;
        if (!card.canFlip)
            return;
        
        if ((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id))))
            return;
    
        setCardIsFlipped(card.id, false);
    
        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }

    useEffect(() => {
        if (!firstCard || !secondCard)
            return;
        (firstCard.number === secondCard.number) ? onSuccessGuess() : onFailureGuess();
    }, [firstCard, secondCard])

    useEffect(() => {
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(() => setCardIsFlipped(card.id, true), index++ * 100);
            }
            setTimeout(() => setCanFlip(true), cards.length * 100);
        }, 3000);
    }, [])

    // Utility function to group cards into Rows
    const groupBy = cards.reduce((grouped, card) => {
        if (!grouped[card.indexKey]) grouped[card.indexKey] = [];
        grouped[card.indexKey].push(card);
        return grouped;
    }, {});
    
    const renderCardData = () => {
        return Object.entries(groupBy).map(([key, value]) => {
            return <CardsRow onClick={(card) => onCardClicked(card)} cards={ value } key={ value.id }/>
        });
    }

    return (
        <SafeAreaView style={ {flex: 1}}>
            <Text> Card Game App </Text>
            <Text style={styles.cardText}> Number of steps: {cardData.counter} </Text>
            <View style = {{
                margin: 10,
                flex: 1,
                flexDirection: 'row',
                backgroundColor: "red"}}>
                {renderCardData()}
            </View>
            <Button onPress={resetClicked} title="RESET" />
        </SafeAreaView>
    );
}

export default CardGameApp;
