import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import { initAxiosInterceptors } from "../../config/axios";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {LISTADO_ACUERDO_BREADCRUM} from "../../config/breadcrums";
import RowAcuerdo from "./RowAcuerdo";
import TableAcuerdo from "./TableAcuerdo";
import Pagination from "react-js-pagination";
import MParticipante from "./MParticipante";
import { toastr } from "react-redux-toastr";
const queryString = require('query-string');
//import GridEquipo from "../m000_common/grids/GridEquipo";

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

async function updateEstado(participante) {
    const {data} = await Axios.put(`/actaparticipante/${participante.id}`,participante);
    return data;
}

export const Acuerdo = () => {

  async function buscarAcuerdo(query) {
    // alert(query)
     const {data} = await Axios.get(`/actaproceso`);
     return data;
 }

 const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItemsCount, settotalItemsCount] = useState(3);
  const [activePage, setactivePage] = useState(1);
  const [acuerdos, setAcuerdos] = useState({"count":5,"rows":[]});

  const [mostrarPartPopup, setMostrarPartPopup] = useState(false);
  const [codPlanoPopup, setCodPlanoPopup] = useState('');
  const [participantesPopup, setParticipantesPopup] = useState([]);

  const [actividades, set_actividades] = useState({ActaParticipante:[]});

  useEffect(() => {
      async function init() {
          try {
              let query =  await  queryString.stringify({busqueda,page, limit});
              let acuerdo = await buscarAcuerdo(query)
              console.log(acuerdo);
              setAcuerdos({rows:acuerdo})
              settotalItemsCount(acuerdo.length)
          } catch (error) {
              alert('Ocurrio un error')
              console.log(error);
          }
      }
      init();
  }, []);
  

  const buscarAcuerdoFilter = async (e) => {

    e.preventDefault();
    let query =  await  queryString.stringify({ busqueda, page, limit});
    let acuerdo = await buscarAcuerdo(query)
    setAcuerdos({rows:acuerdo})
  }

  const descarxls = () => {

    let listexportexcel = acuerdos.rows;
    var resultgeojson = alasql(`SELECT *
             FROM ? `, [listexportexcel])
    var opts = [{
        sheetid: 'Reporte',
        headers: true
    }];
    var res = alasql('SELECT INTO XLSX("ListadoAcuerdos.xlsx",?) FROM ?', [opts, [resultgeojson]]);
    return false;
  }

  const handlePageChange = async (pageNumber) => {
    await setPage(pageNumber)
    //alert(pageNumber)
    setactivePage(pageNumber)
    setPage(pageNumber)
    console.log(`active page is ${pageNumber}`);
    let query =  await  queryString.stringify({ busqueda, page:pageNumber, limit});
    let acuerdo= await buscarAcuerdo(query)
    setAcuerdos({rows:acuerdo})
}

    const cerrarPartModal=async (estado)=>{
        setMostrarPartPopup(estado);
        let query =  await  queryString.stringify({busqueda,page, limit});
        let acuerdo = await buscarAcuerdo(query)
        setAcuerdos({rows:acuerdo})
    }

    const cargarPopupParticipantes = (codacta, participantes) => {
        const ar_participantes = [];
        ar_participantes.push(participantes)
        actividades.ActaParticipante=ar_participantes;
        setCodPlanoPopup(codacta);
        setParticipantesPopup(actividades.ActaParticipante);
        setMostrarPartPopup(true);
    }

    const checkFinalizo = (key,e) => {
        const { checked } = e.target
        actividades.ActaParticipante[key].estadocomp = checked ? 'CUMPLIDO' : null ;
    };

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        console.log(actividades);
        //actividades.ActaParticipante.forEach(async (item,i) => {
            try {
                await updateEstado(actividades.ActaParticipante[0]);
                //if(actividades.ActaParticipante.length ==  i+1){
                    toastr.success('Estado de compromiso', 'Se registro correctamente.');
                    cerrarPartModal();
                //}
            }
            catch (e) {
                alert(e.message)
            }
        //});
    }

  const cabecerasTabla = ["NRO","CÓDIGO ACTA", "PROYECTO","EQUIPO","PROFESIONAL","ACTIVIDAD", "PRODUCTO","DESCRIPCION","ASISTENCIA", "FECHA INCIO", "FECHA COMPROMISO","ALERTA","ESTADO","REVISIÓN"]
 
  return (
    <>
          <WraperLarge titleForm={"Listado de acuerdos"} listbreadcrumb={LISTADO_ACUERDO_BREADCRUM}>
            <fieldset className={'fielsettext'}>
                <form onSubmit={buscarAcuerdoFilter}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input type="text" className="form-control "
                                       placeholder="Escriba el codigo de acta"
                                       onChange={e => setBusqueda(e.target.value)}
                                ></input>
                                <span className="input-group-btn">
                                                            <button className="btn btn-default " type="submit"><i
                                                                className="fa fa-search"></i></button>
                                                        </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button type="button" onClick={descarxls}
                                    className="btn btn-default pull-right btn-sm fullborder">
                                <i className="fa fa-file-excel-o"></i> Descargar Excel
                            </button>
                        </div>
                    </div>
                </form>
            </fieldset>
            <div className="panel panel-default">
                <TableAcuerdo cabecera={cabecerasTabla}>
                   {acuerdos.rows.map((acuerdo, i) => (
                        <RowAcuerdo nro={i} acuerdo={acuerdo} loadParticipantes={cargarPopupParticipantes}></RowAcuerdo>
                    ))}
                </TableAcuerdo>
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
            {mostrarPartPopup && <MParticipante closeventana={cerrarPartModal} codacta={codPlanoPopup} participante={participantesPopup} checkFinalizo={checkFinalizo} handleUpdateClick={handleUpdateClick}/>}
          </WraperLarge>  
    </>
);
};
export default Acuerdo;
