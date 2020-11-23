import React, {useEffect, useState, createContext} from 'react';
import {Link} from "react-router-dom";
import Wraper from "../../m000_common/formContent/WraperLarge";
import {LISTADO_TRABAJADOR_BREADCRUM} from "../../../config/breadcrums";
import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import TableTrabajador from "./TableTrabajador";
import TrabajadorRow from "./TrabajadorRow";
import {useTable} from "../../../hooks/useTable";
import Pagination from "react-js-pagination";

const queryString = require('query-string');

const {alasql} = window;

const Axios = initAxiosInterceptors();


async function buscarTrabajador(query) {
    // alert(query)
    const {data} = await Axios.get(`/usuario?` + query);
    return data;
}


const Trabajadores = ({history}) => {

    const [busqueda, setBusqueda] = useState('');
    const [activePage,changePage, limit, totalItemsCount,pageRangeDisplayed  , trabajadors] = useTable();

    useEffect(() => {
        async function init() {
            try {
                let query = await queryString.stringify({busqueda, page: activePage, limit});
                let trabajadores = await buscarTrabajador(query)
                changePage(activePage, trabajadores);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        init();
    }, []);

    const buscarTrabadorFilter = async (e) => {

        e.preventDefault();
        let query = await queryString.stringify({busqueda,page: 1, limit});
        let trabajadores = await buscarTrabajador(query)
        changePage(activePage, trabajadores);
    }

    //const trabajadores = useSelector(state => state.trabajador.trabajadors);
    //const loading = useSelector(state => state.trabajador.cargando);

    const descarxls = () => {

        let listexportexcel = trabajadors.rows;
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
        let query = await queryString.stringify({busqueda, page: pageNumber, limit});
        let resultList = await buscarTrabajador(query)
        changePage(pageNumber, resultList);

    }

    const cabecerasTabla = ["DNI", "Nombres", "Apellidos", "Telefonos", "Correos", "Acciones"]

    return (
        <>

            <Wraper titleForm={"Listado de Trabajadores"} listbreadcrumb={LISTADO_TRABAJADOR_BREADCRUM}>
                <fieldset className={'fielsettext'}>
                    <form onSubmit={buscarTrabadorFilter}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input type="text" className="form-control "
                                           placeholder="Nombre del Trabajador o DNI"
                                           onChange={e => setBusqueda(e.target.value)}
                                    ></input>
                                    <span className="input-group-btn">
                                                                <button className="btn btn-default " type="submit"><i
                                                                    className="fa fa-search"></i></button>
                                                            </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Link to={`/trabajador-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                    <i className="fa fa-plus"></i> Agregar Trabajador</Link>
                                <button type="button" onClick={descarxls}
                                        className="btn btn-default pull-right btn-sm fullborder">
                                    <i className="fa fa-file-excel-o"></i> Descargar Excel
                                </button>
                            </div>
                        </div>
                    </form>
                </fieldset>
                <div className="panel panel-default">
                    <TableTrabajador cabecera={cabecerasTabla}>
                        {trabajadors.rows.map((trabajador, i) => (
                            <TrabajadorRow nro={i} trabajador={trabajador}></TrabajadorRow>
                        ))}
                    </TableTrabajador>
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


export default Trabajadores;