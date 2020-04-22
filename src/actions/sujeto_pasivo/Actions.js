import {
    LISTAR_PROPIETARIO,GUARDAR_PROPIETARIO
} from './types';

import {initAxiosInterceptors} from '../../config/axios';

const axios = initAxiosInterceptors();

export const listar = (predio_id) => async dispatch => {
    const {data} = await axios.get(`/list_propietario?predio_id=${predio_id}`);
    dispatch({
        type: LISTAR_PROPIETARIO,
        payload: data
    })
}

export const agregar = (object) => async dispatch => {
    const {data} = await axios.post('/save_propietario', object);
    dispatch({type: GUARDAR_PROPIETARIO, payload: data});
}


