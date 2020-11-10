import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Wraper from "../m000_common/formContent/WraperLarge";
import {LISTADO_INDICADERES_BREADCRUM} from "../../config/breadcrums";
import {initAxiosInterceptors} from '../../config/axios';
import TrabajadorRow from "./Row";

import {
Table
} from "../../components/forms";

import {useTable} from "../../hooks/useTable";
import Pagination from "react-js-pagination";
const queryString = require('query-string');
const Axios = initAxiosInterceptors();
const {alasql} = window;




async function buscarIndicador(query) {
    // alert(query)
    const {data} = await Axios.get(`/indicadores/paginate?`+ query);
    return data;
}


const GestionPredials = ({}) => {


    const [busqueda, setBusqueda] = useState('');
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed , list] = useTable();

    useEffect(() => {
        async function init() {
            try {
                let query =  await  queryString.stringify({busqueda,page: activePage, limit});
                let resultList=await buscarIndicador(query);
                changePage(activePage,resultList);

            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);

    const buscarIndicadorFilter = async (e) => {

        e.preventDefault();
        let query =  await  queryString.stringify({busqueda, page:activePage, limit});
        let list=await buscarIndicador(query);
        changePage(activePage,list);

    }

    //const trabajadores = useSelector(state => state.trabajador.trabajadors);
    //const loading = useSelector(state => state.trabajador.cargando);

    const descarxls = () => {

        let listexportexcel = list.rows;
        var resultgeojson = alasql(`SELECT *
                 FROM ? `, [listexportexcel])
        var opts = [{
            sheetid: 'Reporte',
            headers: true
        }];
        var res = alasql('SELECT INTO XLSX("ListadoTrabajadores.xlsx",?) FROM ?', [opts, [resultgeojson]]);
        return false;
    }


    const handlePageChange = async (pageNumber) => {
        let query =  await  queryString.stringify({busqueda, page:activePage, limit});
        let resultList=await buscarIndicador(query)
        changePage(pageNumber,resultList);

    }

    const cabecerasTabla = ["CATEGORIA", "DENOMINACIÓN", "URL PBI", "ARCHIVO",  "ACCIONES"]

    return (
        <>

            <Wraper titleForm={"Listado de Indicadores"} listbreadcrumb={LISTADO_INDICADERES_BREADCRUM}>
                <fieldset className={'fielsettext'}>
                    <form onSubmit={buscarIndicadorFilter}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input type="text" className="form-control "
                                           placeholder="Nombre del Indicador"
                                           onChange={e => setBusqueda(e.target.value)}
                                    ></input>
                                    <span className="input-group-btn">
                                                                <button className="btn btn-default " type="submit"><i
                                                                    className="fa fa-search"></i></button>
                                                            </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Link to={`/indicador-add`} className="btn btn-danger pull-right btn-sm fullborder btn-control">
                                    <i className="fa fa-plus"></i> Agregar </Link>
                                <button type="button" onClick={descarxls}
                                        className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </div>
                        </div>
                    </form>
                </fieldset>
                <div className="panel panel-default">
                    <Table cabecera={cabecerasTabla}>
                        {list.rows.map((trabajador, i) => (
                            <TrabajadorRow nro={i} row={trabajador}></TrabajadorRow>
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
                </div>
            </Wraper>
        </>
    );

}


export default GestionPredials;