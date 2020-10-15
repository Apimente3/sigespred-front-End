import {initAxiosInterceptors} from '../../config/axios';

const Axios = initAxiosInterceptors();

export const helperGetListProyectos = async (busqueda = '') => {
    const {data:proyectos} = await Axios.get(`/gestionpredial`);
    return {proyectos};
}

export const helperGetListTipoPlano = async (busqueda = '') => {
    const {data:tiposplano} = await Axios.get(`/tipoplano`);
    return {tiposplano};
}

  export const helperGetListDepartamento = async (busqueda = '') => {
    const {data:departamentos} = await Axios.get(`/departamento`);
    return {departamentos};
}

export const helperGetListProvincia = async(params= '01') => {
    const {data:provincias} = await Axios.get(`/provincia?departamentoid=${params}`);
    return {provincias};
}

export const helperGetListDetalle = async(params) => {
    if (params) {
        const {data:listado} = await Axios.get(`/listadetalle?listaid=${params}`);
        return {listado};
    }
    return [];
}