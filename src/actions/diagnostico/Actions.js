import {
  LISTAR_ACTIVIDADES_DIAGNOSTICO
} from './types';

/*Importando los Axios configurado*/
import {initAxiosInterceptors} from '../../config/axios';
const axios=initAxiosInterceptors();


export const listar_actividades_diagnostico = (id) => async dispatch => {
    const respuesta = await axios.get(`/list_diagnostico?proyecto_id=${id}`); 
    
    
    console.log(respuesta)
    dispatch({
        type: LISTAR_ACTIVIDADES_DIAGNOSTICO,
        payload: respuesta.data
    })
}
