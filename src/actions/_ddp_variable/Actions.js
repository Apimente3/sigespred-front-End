import {
    ACTUALIZAR_VALOR,
    LEER_VALOR
} from './types';


export const actualizar = predio => dispatch => {
    dispatch({
        type: ACTUALIZAR_VALOR,
        payload: predio
    })
}

export const leer = () => dispatch => {
    dispatch({
        type: LEER_VALOR,
        payload: ''
    })
}