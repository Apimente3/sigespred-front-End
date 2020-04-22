import {
    MOSTRAR_BRIGADAS,
    ELIMINAR_BRIGADA,SET_FOTO,
    EDITAR_BRIGADA,
    CONTINUAR_AGREGAR_BRIGADA,
    BUSCAR_BRIGADA,AGREGAR_BRIGADA,MOSTRAR_BRIGADA,GET_TRABADORES
}
    from '../actions/brigada/types';

// cada reducer tiene su propio state

const initialState = {
    brigadistas:[],
    coordinadores:[],
    brigadas: [],
    brigada: {},
    cargando:true,
    foto:''
}

export default function(state = initialState, action) {
    console.log(action)

    switch(action.type) {

        case GET_TRABADORES:
            return {
                ...state,
                brigadistas: action.payload.filter(item => item.rol==3) ,coordinadores:action.payload.filter(item => item.rol==2)
            }
        default:
            return state;
    }
}