import { BUSCAR_PROYECTOS} from '../actions/expedientes/types';
/*Estado Inicial*/
const initialState = {
    listExpTratDirectExpropiacion:[],

}

export default function(state = initialState, action) {
    switch(action.type) {
        case BUSCAR_PROYECTOS:
            return {
                ...state,
                listExpTratDirectExpropiacion: action.payload
            }

   
        default:
            return state;
    }
}