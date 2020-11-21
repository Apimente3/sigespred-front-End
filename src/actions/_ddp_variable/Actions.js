import {
    ACTUALIZAR_VALOR,
    LEER_VALOR
} from './types';


export const actualizar = predioid => dispatch => {
    dispatch({
        type: ACTUALIZAR_VALOR,
        payload: predioid
    })
}

export const leer = () => dispatch => {
    dispatch({
        type: LEER_VALOR,
        payload: ''
    })
}