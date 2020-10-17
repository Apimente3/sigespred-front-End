import {initAxiosInterceptors} from '../../config/axios';

import {
    AGREGAR_PLANO,
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

export const agregar = PLANO => async dispatch => {
    const response = await axios.post('/plano', PLANO);
    dispatch({type: AGREGAR_PLANO, payload: response});
}

/*
export const listar = () => async dispatch => {
    const respuesta = await axios.get(`/trabajadors`);
    dispatch({
        type: MOSTRAR_TRABAJADORS,
        payload: respuesta
    })
}
export const buscarTrabajador = busqueda => async dispatch => {
    const respuesta = await axios.get(`/trabajadors?dni=${busqueda}`);
    dispatch({
        type: BUSCAR_TRABAJADOR,
        payload: respuesta.data
    })
}

export const obtener = id => async dispatch => {
    const respuesta = await axios.get(`/trabajadors/${id}`);
    dispatch({
        type: MOSTRAR_TRABAJADOR,
        payload: respuesta.data
    })
}

export const borrar = id => async dispatch => {
    await axios.delete(`/trabajadors/${id}`);

    dispatch({
        type: ELIMINAR_TRABAJADOR,
        payload: id
    })
}

export const agregar = TRABAJADOR => async dispatch => {
    const response = await axios.post('/trabajadors', TRABAJADOR);
    dispatch({type: AGREGAR_TRABAJADOR, payload: response});
}

export const setcontinuarAgregar = isagregar => async dispatch => {
    dispatch({type: CONTINUAR_AGREGAR_TRABAJADOR, payload: isagregar});
}

export const editar = TRABAJADOR => async dispatch => {
    
    console.log(TRABAJADOR)
    const respuesta = await axios.put(`/trabajadors/${TRABAJADOR.id}`, TRABAJADOR);
    dispatch({
        type: EDITAR_TRABAJADOR,
        payload: respuesta.data
    })
}

export const setFoto = foto => async dispatch => {


    dispatch({
        type: SET_FOTO,
        payload: foto
    })
}

*/