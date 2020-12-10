import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors} from "../../config/axios";
import Wraper from "../m000_common/formContent/WraperLarge";
import {LISTADO_PLANTILLAIMP_BREADCRUM} from "../../config/breadcrums";
import {useTable} from "../../hooks/useTable";
import { Table } from "../../components/forms";
import PlantillaImpresionRow from "./PlantillaImpresionRow";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr';
import { Loading } from "../../components/forms";

const Axios = initAxiosInterceptors();
const {$} = window;
const queryString = require('query-string');

async function buscarPlantilla(query) {
    const {data} = await Axios.get(`/plantillaimpresion?${query}`);
    return data;
}

const PlantillaImpresionList = ({history, match}) => {
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();
    const [cargandoGrid, setCargandoGrid] = useState(true);

    useEffect(() => {
        const init = async () => {
            let query =  await  queryString.stringify({page: activePage, limit});
            let listPlantillas = await buscarPlantilla(query);
            changePage(activePage,listPlantillas);
            setCargandoGrid(false);
        };
        init();
    }, []);

    const handlePageChange = async (pageNumber) => {
        let query =  await  queryString.stringify({page:pageNumber, limit});
        let listPlantillas = await buscarPlantilla(query);
        changePage(pageNumber,listPlantillas);
    }
    
    const ejecutarFilter=async ()=>{
        let query =  await  queryString.stringify({page: activePage, limit});
        let listPlantillas = await buscarPlantilla(query);
        changePage(activePage,listPlantillas);
    }

    const ejecutarEliminar = (idplantilla) => {
        Axios.delete(`/plantillaimpresion/${idplantilla}`)
        .then(() => {
            ejecutarFilter();
        })
        .catch(error => {
            toastr.error('Eliminar Plantilla de Impresión', "Se encontró un error: " +  error);
        });
    }    

    const callbackEliminarPlantilla = (idplantilla) => {
        try {
            const toastrConfirmOptions = {
                onOk: () => ejecutarEliminar(idplantilla),
            };
            toastr.confirm(`¿Desea eliminar la plantilla: ${idplantilla}?`, toastrConfirmOptions);
        }
        catch (e) {
            toastr.error('Lista de Plantillas de Impresión', "Se encontró un error: " +  e.message);
        }
    }

    const cabecerasTabla = ["","ID", "NOMBRE", "NOMBRE ARCHIVO", "MÓDULO/OPCIÓN ASOCIADO","ACCIONES"]
    return (
        <>
        <Wraper titleForm={"Listado de Plantillas de Impresión"} listbreadcrumb={LISTADO_PLANTILLAIMP_BREADCRUM}>
            <legend className="mleft-20"> Listado de Plantillas de Impresión</legend>
            <div className="mt-4 form-group">
                <div className="row">
                    <div className="col-md-6">
                        <legend className="fullborder">&nbsp;</legend>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to={`/printtemp-edit`} className="btn btn-danger btn-sm mright-10">
                            <i className="fa fa-plus-circle"></i>  Agregar Plantilla de Impresión
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                {
                (cargandoGrid)?
                    <Loading></Loading>
                    :
                    (
                    <>
                    <Table cabecera={cabecerasTabla}>
                        {list.rows.map((plantilla, i) => (
                            <PlantillaImpresionRow nro={i} plantilla={plantilla} callback={callbackEliminarPlantilla} />
                        ))}
                    </Table>
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
                    )
                }
            </div>
        </Wraper>
        </>
    )
}

export default PlantillaImpresionList;