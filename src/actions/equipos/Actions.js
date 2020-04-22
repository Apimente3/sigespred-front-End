import {
    AGREGAR_INTEGRANTE,
    AGREGAR_EQUIPO,
    LISTAR_EQUIPOS,
    ELIMINAR_INTEGRANTE, DETALLE_EQUIPO
} from './types';

import {initAxiosInterceptors} from '../../config/axios';

const axios = initAxiosInterceptors();

export const listar_equipos = (busqueda) => async dispatch => {
    const {data} = await axios.get(`/equipos?busqueda=${busqueda}`);
    console.log(data)
    dispatch({
        type: LISTAR_EQUIPOS,
        payload: data
    })
}


export const detalle_equipo = (equipo_id) => async dispatch => {
    const {data} = await axios.get(`/details-equipo?equipo_id=${equipo_id}`);
    console.log("--------------ACTION-------------")
    debugger
    console.log(data)
    dispatch({
        type: DETALLE_EQUIPO,
        payload: data
    })
}

export const agregar_equipo = (equipo) => async dispatch => {
    const {data} = await axios.post('/equipo', equipo);
    dispatch({type: AGREGAR_EQUIPO, payload: data});

}


export const agregar_integrante = (integrante) => async dispatch => {
    const {data} = await axios.post('/add-integrante', integrante);
    dispatch({type: AGREGAR_INTEGRANTE, payload: data});
}

export const eliminar_integrante = (integrante) => async dispatch => {
    const {data} = await axios.delete('/integrante', integrante);
    dispatch({type: ELIMINAR_INTEGRANTE, payload: data});
}
