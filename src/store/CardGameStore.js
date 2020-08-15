import { createStore } from 'redux'
import reducer from '../reducer/CardGameReducer'

export const cardStore = createStore(reducer)