import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors} from "../../config/axios";
import Wraper from "../m000_common/formContent/Wraper";
import {LISTADO_TRAMOS_BREADCRUM} from "../../config/breadcrums";
import {useTable} from "../../hooks/useTable";
import TableTramo  from "./TableTramo";
import TramoRow from "./TramoRow";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr';

const Axios = initAxiosInterceptors();
const {$} = window;
const queryString = require('query-string');

async function getProyecto(id) {
    const {data} = await Axios.get(`/gestionpredial/${id}`);
    return data;
}

async function buscarTramo(query) {
    const {data} = await Axios.get(`/tramopage?${query}`);
    return data;
}


const TramoList = ({history, match}) => {
    const {id}=match.params;
    const [tituloVentana, setTituloVentana] = useState('');
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable(100);

    useEffect(() => {
        const init = async () => {
            let dataProyecto= await getProyecto(id);
            setTituloVentana(`${dataProyecto.denominacion} (${dataProyecto.abreviatura})`);
            let query =  await  queryString.stringify({gestionpredialid: id, page: activePage, limit});
            let listTramos = await buscarTramo(query);
            changePage(activePage,listTramos);
        };
        init();
    }, []);

    
    const handlePageChange = async (pageNumber) => {   

    }
    
    const ejecutarFilter=async ()=>{
        let query =  await  queryString.stringify({gestionpredialid: id, page: activePage, limit});
        let listTramos = await buscarTramo(query);
        changePage(activePage,listTramos);
    }

    const ejecutarEliminar = (idtramo) => {
        Axios.delete(`/tramo/${idtramo}`)
        .then(() => {
            ejecutarFilter();
        })
        .catch(error => {
            toastr.error('Eliminar Tramo', "Se encontró un error: " +  error);
        });
    }    

    const callbackEliminarTramo = (idtramo) => {
        try {
            const toastrConfirmOptions = {
                onOk: () => ejecutarEliminar(idtramo),
            };
            toastr.confirm(`¿Desea eliminar el tramo: ${idtramo}?`, toastrConfirmOptions);
        }
        catch (e) {
            toastr.error('Lista de Tramos', "Se encontró un error: " +  e.message);
        }
    }

    const cabecerasTabla = ["","ID", "DESCRIPCIÓN", "ACCIONES"]
    return (
        <>
        <Wraper titleForm={"Listado de Tramos o Sectores"} listbreadcrumb={LISTADO_TRAMOS_BREADCRUM}>
            <legend className="mleft-20"> Listado de Tramos o Sectores - Proyecto: {tituloVentana}</legend>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                        <legend className="fullborder">&nbsp;</legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to={`/tramo-edit/${id}/${tituloVentana}`} className="btn btn-danger btn-sm mright-10">
                            <i className="fa fa-plus-circle"></i>  Agregar Tramo
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                    <TableTramo cabecera={cabecerasTabla}>
                        {list.rows.map((tramo, i) => (
                            <TramoRow nro={i} tramo={tramo} callback={callbackEliminarTramo} idproyecto={id} titproyecto={tituloVentana}></TramoRow>
                        ))}
                    </TableTramo>
                    <div className="panel-footer clearfix pull-right">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={limit}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={pageRangeDisplayed}
                            onChange={handlePageChange}
                        ></Pagination>
                    </div>
            </div>
        </Wraper>
        </>
    )
}

export default TramoList;