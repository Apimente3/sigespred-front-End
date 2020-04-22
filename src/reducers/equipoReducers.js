import {
    AGREGAR_EQUIPO,
    LISTAR_EQUIPOS,DETALLE_EQUIPO,AGREGAR_INTEGRANTE
  
} from '../actions/equipos/types';

const initialState = {
    equipos: [],
    detalle_equipo:{
        equipo:{},
        resposable:{},
        integrantes:[]
    },
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AGREGAR_EQUIPO:
            return {
                ...state,
                equipos:  [...state.equipos, action.payload]
            }
        case LISTAR_EQUIPOS:
            return {
                ...state,
                equipos: action.payload
            }

        case DETALLE_EQUIPO:
            return {
                ...state,
                detalle_equipo: action.payload
            }

        case AGREGAR_INTEGRANTE:
            return {
                ...state
            }
        default:
            return state;
    }
}