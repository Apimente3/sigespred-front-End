import {
    AGREGAR_PLANO,
    BUSCAR_PLANOS,
    MOSTRAR_PLANO,
    EDITAR_PLANO,
    CONTINUAR_AGREGAR_PLANO
} from '../actions/_ddp_plano/types';

// cada reducer tiene su propio state
const initialState = {
    planos: [],
    plano: {},
    cargando:true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case BUSCAR_PLANOS:
            return {
                ...state,
                planos: action.payload,
                cargando:false
            }
            case AGREGAR_PLANO:
                return {
                    ...state,
                    planos: [...state.planos, action.payload]
            }
            case MOSTRAR_PLANO:
                return {
                    ...state,
                    plano: action.payload
                }
            case EDITAR_PLANO:
                return state;
            case CONTINUAR_AGREGAR_PLANO:
                return {
                    ...state,
                    isclose: action.payload
                }
            default:
                return state;
    }
}

// import {
//     MOSTRAR_TRABAJADORS,
//     MOSTRAR_TRABAJADOR,
//     AGREGAR_TRABAJADOR,
//     EDITAR_TRABAJADOR,
//     ELIMINAR_TRABAJADOR,
//     CONTINUAR_AGREGAR_TRABAJADOR, BUSCAR_TRABAJADOR, SET_FOTO
// }
//     from '../actions/trabajador/types';

// // cada reducer tiene su propio state

// const initialState = {
//     trabajadors: [],
//     trabajador: {},
//     cargando:true,
//     foto:''
// }

// export default function(state = initialState, action) {
//     console.log(action)
    
//     switch(action.type) {
//         case MOSTRAR_TRABAJADORS:
//             return {
//                 ...state,
//                 trabajadors: action.payload
//             }
//         case MOSTRAR_TRABAJADOR:
//             return {
//                 ...state,
//                   trabajador: action.payload
//                 , foto: action.payload.foto
//             }
//         case BUSCAR_TRABAJADOR:
//             return {
//                 ...state,
//                 trabajadors: action.payload,
//                 cargando:false
//             }
//         case ELIMINAR_TRABAJADOR:
//             return {
//                 ...state,
//                 trabajadors: state.trabajadors.filter(trabajador => trabajador.id !== action.payload)
//             }
//         case AGREGAR_TRABAJADOR:
         
//             return {
//                 ...state,
//                 trabajadors: [...state.trabajadors, action.payload]
                
//             }
//         case CONTINUAR_AGREGAR_TRABAJADOR:
//             return {
//                 ...state,
//                 isclose: action.payload
//             }
//         case EDITAR_TRABAJADOR:
//             return {
//                 ...state,
//                 trabajadors: state.trabajadors.map(
//                     trabajador => trabajador.id === action.payload.id
//                         ? (trabajador = action.payload)
//                         : trabajador
//                 )
//             }
//         case SET_FOTO:
//             return {
//                 ...state,
//                 foto: action.payload
//             }
//         default:
//             return state;
//     }
// }