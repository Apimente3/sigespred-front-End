import {initAxiosInterceptors} from '../../config/axios';

import {
    AGREGAR_EQUIPO,
    BUSCAR_EQUIPO,
} from './types';

// import {
//     MOSTRAR_TRABAJADORS,
//     MOSTRAR_TRABAJADOR,
//     AGREGAR_TRABAJADOR,
//     EDITAR_TRABAJADOR,
//     ELIMINAR_TRABAJADOR,CONTINUAR_AGREGAR_TRABAJADOR
//     ,BUSCAR_TRABAJADOR,SET_FOTO
// } from './types';

const axios=initAxiosInterceptors();

export const buscarEquipo = busqueda => async dispatch => {
    let respuesta;

    respuesta = await axios.get(`/equipo`);
    
    dispatch({
        type: BUSCAR_EQUIPO,
        payload: respuesta.data
    })
}