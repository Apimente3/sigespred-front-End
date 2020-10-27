import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import Wraper from "../m000_common/formContent/Wraper";
import {REGISTRO_EQUIPO_BREADCRUM} from "../../config/breadcrums";
import RowEquipo from "./RowEquipo";
import TableEquipo from "./TableEquipo";
import Pagination from "react-js-pagination";
const queryString = require('query-string');
//import GridEquipo from "../m000_common/grids/GridEquipo";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const Equipo = () => {

  async function buscarArea() {
    // alert(query)
     const {data} = await Axios.get(`/area`);
     return data;
 }

 const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [area, setAreas] = useState({"count":5,"rows":[]});

  useEffect(() => {
      async function init() {
          try {
              
              let areas=await buscarArea('')
              setAreas({rows:areas})
              settotalItemsCount({count:areas.count})
          } catch (error) {
              alert('Ocurrio un error')
              console.log(error);
          }
      }
      init();
  }, []);

  const buscarAreaFilter = async (e) => {

    e.preventDefault();
    let query =  await  queryString.stringify({busqueda, page, limit});
    let equipos=await buscarEquipo()
    setEquipos(equipos)
  }

  const descarxls = () => {

    let listexportexcel = equipos.rows;
    var resultgeojson = alasql(`SELECT *
             FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoAreas.xlsx",?) FROM ?', [opts, [resultgeojson]]);
    return false;
  }

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber)
    //alert(pageNumber)
    setactivePage(pageNumber)
    setPage(pageNumber)
    console.log(`active page is ${pageNumber}`);
    let query =  await  queryString.stringify({busqueda, page:pageNumber, limit});
    let areas=await buscarArea()
    setAreas(areas)

}

  const cabecerasTabla = ["ID", "AREA", "SUBAREA", "DESCRIPCION", "USUARIO", "Acciones"]

 

  return (
    <>
          <Wraper titleForm={"Listado de Areas"} listbreadcrumb={REGISTRO_EQUIPO_BREADCRUM}>
            <fieldset className={'fielsettext'}>
                <form onSubmit={buscarAreaFilter}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input type="text" className="form-control "
                                       placeholder="Area o SubArea"
                                       
                                ></input>
                                <span className="input-group-btn">
                                                            <button className="btn btn-default " type="submit"><i
                                                                className="fa fa-search"></i></button>
                                                        </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Link to={`/area-add`} className="btn btn-danger pull-right btn-sm fullborder">
                                <i className="fa fa-plus"></i> Agregar Area</Link>
                            <button type="button" onClick={descarxls}
                                    className="btn btn-default pull-right btn-sm fullborder">
                                <i className="fa fa-file-excel-o"></i> Descargar Excel
                            </button>
                        </div>
                    </div>
                </form>
            </fieldset>
            <div className="panel panel-default">
                <TableEquipo cabecera={cabecerasTabla}>
                   {equipos.rows.map((equipo, i) => (
                        <RowEquipo equipo={equipo}></RowEquipo>
                    ))}
                </TableEquipo>
                <div className="panel-footer clearfix pull-right">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={limit}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                    ></Pagination>
                </div>
            </div>
          </Wraper>  
    </>
);
};
export default Equipo;
