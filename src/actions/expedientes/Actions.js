import {
    BUSCAR_PROYECTOS
} from './types';

import {initAxiosInterceptors} from '../../config/axios';

const axios = initAxiosInterceptors();

export const buscar_expedientes = (opcion, idproyecto, busqueda) => async dispatch => {
    const {data} = await axios.get(`/expedientesSearch?opcion=${opcion}&idproyecto=${idproyecto}&busqueda=${busqueda}`);
    dispatch({
        type: BUSCAR_PROYECTOS,
        payload: data
    })
}


