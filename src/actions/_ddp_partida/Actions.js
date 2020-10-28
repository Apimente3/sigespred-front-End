import { initAxiosInterceptors } from "../../config/axios";

import { AGREGAR_PARTIDA, BUSCAR_PARTIDA, EDITAR_PARTIDA, RESPUESTA_PARTIDA } from "./types";

const axios = initAxiosInterceptors();

export const agregar = (PARTIDA) => async (dispatch) => {
  
  const response = await axios.post("/partidaregistral", PARTIDA);
  dispatch({ type: AGREGAR_PARTIDA, payload: response });
};

export const buscarPartida = (busqueda) => async (dispatch) => {
  let respuesta;
  if (busqueda) {
    respuesta = await axios.get(`/partidaregistral/buscar?${busqueda}`);
    // console.log('-------------------ENTROOO')
    // console.log(respuesta)
  } else {
    respuesta = await axios.get(`/partidaregistral/buscar`);
  }
  dispatch({
    type: BUSCAR_PARTIDA,
    payload: respuesta.data,
  });
};

export const editar = PARTIDA => async dispatch => {
console.log('-----------------------ENTROOOOOOO---------------')
  console.log(PARTIDA)
  const respuesta = await axios.put(`/partidaregistral/${PARTIDA.id}`, PARTIDA);
  dispatch({
      type: EDITAR_PARTIDA,
      payload: respuesta.data
  })
}

export const respuestaPartida = PARTIDA => async dispatch => {

  console.log(PARTIDA)
  const respuesta = await axios.put(`/partidaregistral/${PARTIDA.id}`, PARTIDA);
  dispatch({
      type: RESPUESTA_PARTIDA,
      payload: respuesta.data
  })
}

