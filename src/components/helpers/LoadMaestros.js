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

export const helperGetListProvincia = async(params) => {
    if (params) {
        const {data:provincias} = await Axios.get(`/provincia?departamentoid=${params}`);
        return {provincias};
    }
        const {data:provincias} = await Axios.get(`/provincia`);
        return {provincias};
}

export const helperGetListDistrito = async(params) => {
    if (params) {
        const {data:distritos} = await Axios.get(`/distrito?provinciaid=${params}`);
        return {distritos};
    }
        const {data:distritos} = await Axios.get(`/distrito`);
        return {distritos};
}

export const helperGetListDetalle = async(params) => {
    if (params) {
        const {data:listado} = await Axios.get(`/listadetalle?listaid=${params}`);
        return {listado};
    }
    return [];
}

export const helperGetListaLocadores = async(params) => {
    const {data} = await Axios.get(`/autousuario`);
    return data;
}


export const helperGetListaSubAreas = async(params) => {
    const {data:areas} = await Axios.get(`/area`);
    return {areas};
}

export const helperGetListTramos = async(params) => {
    if (params) {
        const {data:tramos} = await Axios.get(`/tramo?gestionpredialid=${params}`);
        return {tramos};
    }
        const {data:tramos} = await Axios.get(`/tramos`);
        return {tramos};
}

export const helperGetListTipoEntidades = async() => {
    const {data:tipoentidades} = await Axios.get(`/tipoentidad`);
    return {tipoentidades};
}

export const helperGetListEntidades = async(params) => {
    if (params) {
        const {data:entidades} = await Axios.get(`/entidad?tipoentidadid=${params}`);
        return {entidades};
    }
    const {data:entidades} = await Axios.get(`/entidad`);
    return {entidades};
}

export const helperGetListaAutoEntidad = async(params) => {
    const {data} = await Axios.get(`/autoentidad`);
    return data;
}

export const helperGetListEntidadesRegistrales = async() => {
    const {data:entidadesregs} = await Axios.get(`/entidadzonareg`);
    return {entidadesregs};
}

export const helperGetListEquipos = async(params) => {
    if (params) {
        const {data:equipos} = await Axios.get(`/equipolista?gestionpredialid=${params}`);
        return {equipos};
    }
        const {data:equipos} = await Axios.get(`/equipolista`);
        return {equipos};
}