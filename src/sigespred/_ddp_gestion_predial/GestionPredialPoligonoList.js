import React, {useEffect, useState} from 'react';
import { useAsync } from "react-async-hook";
import {toastr} from 'react-redux-toastr';
 import TablePoligono from "./TablePoligono";
 import PoligonoRow from "./PoligonoRow";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../config/axios";
import ComboOptions from "../../components/helpers/ComboOptions";
import {useTable} from "../../hooks/useTable";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import * as funcGlob from "../../components/helpers/FuncionesGlobales";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTAR_GESTIONPREDIALPOLIGONO_BREADCRUM} from "../../config/breadcrums";

const Axios = initAxiosInterceptors();
const {alasql}=window;
const {$} = window;
const queryString = require('query-string');

async function getProyecto(id) {
    const {data} = await Axios.get(`/gestionpredial/${id}`);
    return data;
}

async function buscarPoligonos(query) {
    const {data} = await Axios.get(`/validagestionprediallist?${query}`);
    return data;
}

const GestionPredialPoligonoList = ({history, match}) => { 
    const {id}=match.params;
    const [tituloVentana, setTituloVentana] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable(100);

    useEffect(() => {
        const init = async () => {
            let dataProyecto= await getProyecto(id);
            setTituloVentana(`${dataProyecto.denominacion} (${dataProyecto.abreviatura})`);
            let query =  await  queryString.stringify({gestionpredialid: id, page: activePage, limit});
            let listPoligonos = await buscarPoligonos(query);
            changePage(activePage,listPoligonos);
        };
        init();
    }, []);
    
    const handlePageChange = async (pageNumber) => {

    }


    const callbackEliminarPoligono = async (pageNumber) => {
    }

    

    const cabecerasTabla = ["", "ID","REPR. GRÁFICA", "SIST. COORDENADAS VECTOR.", "CONTROL TOPOLÓGICO", "FECHA INFO. VECTOR.","TIPO RASTER", "SIST. COORDENADAS RASTER", "RES. ESPACIAL", "FECHA INFO. RASTER", "ARCHIVO","ACCIONES"]
    return (
        <>
            <WraperLarge titleForm={"Listado de Polígonos"} listbreadcrumb={LISTAR_GESTIONPREDIALPOLIGONO_BREADCRUM}>
            <legend className="mleft-20"> Listado de Polígonos - Proyecto: {tituloVentana}</legend>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                        <legend className="fullborder">&nbsp;</legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to={`/gestionpredial-valida/${id}/${tituloVentana}`} className="btn btn-danger btn-sm mright-10">
                            <i className="fa fa-plus-circle"></i>  Agregar Polígono
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                    <>
                    <TablePoligono cabecera={cabecerasTabla}>
                        {list.rows.map((poligono, i) => (
                            <PoligonoRow nro={i} poligono={poligono} callback={callbackEliminarPoligono} idproyecto={id} titproyecto={tituloVentana} ></PoligonoRow>
                        ))}
                    </TablePoligono>
                    <div className="panel-footer clearfix pull-right">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={limit}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={pageRangeDisplayed}
                            onChange={handlePageChange}
                        ></Pagination>
                    </div>
                    </>
            </div>

            </WraperLarge>
        </>
    );

}

export default GestionPredialPoligonoList;