import { LISTAR_PROPIETARIO,GUARDAR_PROPIETARIO} from '../actions/sujeto_pasivo/types';
/*Estado Inicial*/
const initialState = {
    propietario:{}

}

export default function(state = initialState, action) {
    switch(action.type) {
        case LISTAR_PROPIETARIO:
            return {
                ...state,
                propietario: action.payload
            }

        case GUARDAR_PROPIETARIO:
            return {
                ...state,
                propietario: action.payload
            }
         default:
            return state;
    }
}