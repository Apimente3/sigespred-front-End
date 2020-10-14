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