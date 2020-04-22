import {
   LISTAR_ACTIVIDADES_DIAGNOSTICO
}
    from '../actions/diagnostico/types';

// cada reducer tiene su propio state

const initialState = {
    listado_diagnostico:{
        informe_final:[],
        actividades:[]
    },
   
}

export default function(state = initialState, action) {
    console.log(action)

    switch(action.type) {
        case LISTAR_ACTIVIDADES_DIAGNOSTICO:
            return {
                ...state,
                listado_diagnostico: action.payload
            }
        default:
            return state;
    }
}