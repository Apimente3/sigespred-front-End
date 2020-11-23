import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import Wraper from "../m000_common/formContent/WraperLarge";
import {LISTADO_AREA_BREADCRUM} from "../../config/breadcrums";
import Pagination from "react-js-pagination";
import TableArea from "./TableArea";
import RowArea from './RowArea';
const queryString = require('query-string');
//import GridEquipo from "../m000_common/grids/GridEquipo";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const Area = () => {

  async function buscarArea(query) {
    // alert(query)
    const {data} = await Axios.get(`/areajerarquizado?`+ query);
    
    /*const a = [];
    data.forEach(area => {
        a.push(area)
        area.SubArea.forEach(subarea => {
            a.push(subarea)
            
        });
    });*/
    return data;
 }
    
    const [busqueda, setBusqueda] = useState('');

    const [areas, setAreas] = useState({"count":5,"rows":[]});

  useEffect(() => {
      async function init() {
          try {
              
                let query =  await  queryString.stringify({busqueda});
                let areas = await buscarArea(query)
                console.log(areas);
                setAreas({rows:areas})
          } catch (error) {
              alert('Ocurrio un error')
              console.log(error);
          }
      }
      init();
  }, []);

  const buscarAreaFilter = async (e) => {

    e.preventDefault();
    let query =  await  queryString.stringify({ busqueda});
    let areas = await buscarArea(query)
    setAreas({rows:areas})
  }

  const descarxls = () => {

    let listexportexcel = areas.rows;
    var resultgeojson = alasql(`SELECT *
             FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoAreas.xlsx",?) FROM ?', [opts, [resultgeojson]]);
    return false;
  }

  const cabecerasTabla = ["ID", "ID PADRE", "AREA", "DESCRIPCION", "USUARIO", "Acciones"]

 

  return (
    <>
          <Wraper titleForm={"Listado de Areas"} listbreadcrumb={LISTADO_AREA_BREADCRUM}>
            <fieldset className={'fielsettext'}>
                <form onSubmit={buscarAreaFilter}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input type="text" className="form-control "
                                       placeholder="Area o SubArea"
                                       onChange={e => setBusqueda(e.target.value)}
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
                <TableArea cabecera={cabecerasTabla}>
                   {areas.rows.map((area, i) => (
                        <RowArea area={area}></RowArea>
                    ))}
                </TableArea>
            </div>
          </Wraper>  
    </>
);
};
export default Area;
