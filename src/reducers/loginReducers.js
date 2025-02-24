import { INICIAR_SESSION } from '../actions/login/types';

// cada reducer tiene su propio state

const initialState = {
    productos: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INICIAR_SESSION:
            return {
                ...state,
                productos: action.payload
            }
     
        default:
            return state;
    }
}