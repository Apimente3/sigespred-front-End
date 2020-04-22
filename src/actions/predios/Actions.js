import {
    LISTAR_PREDIOS,AGREGAR_PREDIO
} from './types';

import {initAxiosInterceptors} from '../../config/axios';

const axios = initAxiosInterceptors();

export const listar = (codigo,busqueda='') => async dispatch => {
    const {data} = await axios.get(`/predios-proyecto?codigo_proyecto=${codigo}&busqueda=${busqueda}`);
    dispatch({
        type: LISTAR_PREDIOS,
        payload: data
    })
}

export const agregar = (predio) => async dispatch => {
    const {data} = await axios.post('/predio', predio);
    dispatch({type: AGREGAR_PREDIO, payload: data});
}


