import {CARDS_CLICK, RESET_COUNTER, REFRESH_CARD } from "../utils/constants"

export const onCardClickAction = (card) => {
    return {
        type: CARDS_CLICK,
        card: card
    }
}

export const resetCardsClick = () => {
    return {
        type: RESET_COUNTER
    }
} 

export const refreshCardAction = (card) => {
    return {
        type: REFRESH_CARD,
        card: card
    }
} 
