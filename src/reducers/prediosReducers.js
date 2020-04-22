import { LISTAR_PREDIOS,AGREGAR_PREDIO} from '../actions/predios/types';
/*Estado Inicial*/
const initialState = {
    predios:[],
  
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LISTAR_PREDIOS:
            return {
                ...state,
                predios: action.payload
            }

        case AGREGAR_PREDIO:
            return {
                ...state,
                predios: [...state.predios, action.payload]
            }
        default:
            return state;
    }
}