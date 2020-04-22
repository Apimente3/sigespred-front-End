import {
    OBTENER_POLYGONO_PROYECTO
}
    from '../actions/proyecto/types';

// cada reducer tiene su propio state

const initialState = {
    polygono:{}
}

export default function(state = initialState, action) {

    switch(action.type) {
        case OBTENER_POLYGONO_PROYECTO:
            return {
                ...state,
                polygono: action.payload
            }
        default:
            return state;
    }
}