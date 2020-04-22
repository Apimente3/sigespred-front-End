import {
 OBTENER_POLYGONO_PROYECTO
} from './types';

import {initAxiosInterceptors} from '../../config/axios';

const axios = initAxiosInterceptors();

export const obtener_poligono_proyecto = (codigo) => async dispatch => {

    const {data} = await axios.get(`/obtener_poligono_proyecto?idcapa=1&pre_codigo=${codigo}`);
    let result=JSON.parse(data[0].geojson_3857);
    
    dispatch({
        type: OBTENER_POLYGONO_PROYECTO,
        payload: result
    })
}


