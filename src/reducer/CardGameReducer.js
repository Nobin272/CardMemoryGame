import { CARDS_CLICK, RESET_COUNTER } from "../utils/constants"

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CARDS_CLICK:
            return { 
                counter: state.counter + 1
            }
        case RESET_COUNTER:
            return initialState
        default:
            return state
    }
}

export default reducer;