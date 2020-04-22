import {
  GET_TRABADORES
} from './types';

/*Importando los Axios configurado*/
import {initAxiosInterceptors} from '../../config/axios';
const axios=initAxiosInterceptors();


export const getTrabajadores = () => async dispatch => {
    const respuesta = await axios.get(`/gettrabajadores`);
    dispatch({
        type: GET_TRABADORES,
        payload: respuesta.data
    })
}
