import {
    ACTUALIZAR_VALOR,
    LEER_VALOR
} from '../actions/_ddp_variable/types';

const initialState = {
    predioid: '0',
    predio: { predioid:'0', codigopredio:'NA'},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTUALIZAR_VALOR:
            return {
                ...state,
                predio: action.payload
            }
            case LEER_VALOR:
                return state;
            default:
                return state;
    }
}