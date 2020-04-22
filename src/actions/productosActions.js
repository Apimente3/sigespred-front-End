import { MOSTRAR_PRODUCTOS, ELIMINAR_PRODUCTO, AGREGAR_PRODUCTO, MOSTRAR_PRODUCTO, EDITAR_PRODUCTO } from './types';

import clienteAxios from '../config/axios';

export const mostrarProductos = () => async dispatch => {
     const respuesta = await axios.get('http://localhost:5000/productos');
     dispatch({
          type: MOSTRAR_PRODUCTOS,
          payload: respuesta.data
     })
}
export const mostrarProducto = id => async dispatch => {
     const respuesta = await axios.get(`http://localhost:5000/productos/${id}`);
     dispatch({
          type: MOSTRAR_PRODUCTO,
          payload: respuesta.data
     })
}

export const borrarProducto = id => async dispatch => {
     await axios.delete(`http://localhost:5000/productos/${id}`);

     dispatch({
          type: ELIMINAR_PRODUCTO,
          payload: id
     })
}

export const agregarProducto = producto => async dispatch => {
     const respuesta = await axios.post('productos', producto);
     dispatch({
          type: AGREGAR_PRODUCTO,
          payload: respuesta.data
     })
    
    
    
}

// Crear un nuevo producto - Función principal
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(nuevoProducto());

        // Insertar en la API
        clienteAxios.post('/libros', producto )
            .then(respuesta => {
                console.log(respuesta);

                // Si se inserta correctamente
                dispatch( agregarProductoExito(producto) );
            })
            .catch(error => {
                console.log(error);

                // Si  hay un error
                dispatch( agregarProductoError() );
            })


    }
}


export const editarProducto = producto => async dispatch => {
     const respuesta = await axios.put(`http://localhost:5000/productos/${producto.id}`, producto);
     dispatch({
          type: EDITAR_PRODUCTO,
          payload: respuesta.data
     })
}