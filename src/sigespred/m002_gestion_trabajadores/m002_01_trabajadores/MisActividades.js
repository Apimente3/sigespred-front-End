import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { FormGroup, Input, Row12, Row6 } from "../../../components/forms";
import { initAxiosInterceptors } from "../../../config/axios";
import TableAcuerdo from "../../_ddp_acta/TableAcuerdo";

import RowAcuerdo from "../../_ddp_acta/RowAcuerdo";


const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;

export const MisActividades = () => {
  //const [usuario, setusuario, handleInputChange, reset] = useForm({contraseniaAnterior:"",contraseniaNueva1:"",contraseniaNueva2:""}, ['resoministerial', 'abreviatura']);
  //const [actividades, setActividades, handleInputChange, reset] = useForm({},[]);
  const [acuerdos, setAcuerdos] = useState({"count":5,"rows":[]});



  async function buscarMisActividades(query) {
    const {data} = await Axios.get(`/actaproceso/misactividades?`+ query);
    console.log('---------------')
    console.log(data)
    return data;
}
const cargarPopupParticipantes = (codacta, participantes) => {
    // const ar_participantes = [];
    // ar_participantes.push(participantes)
    // actividades.ActaParticipante=ar_participantes;
    // setCodPlanoPopup(codacta);
    // setParticipantesPopup(actividades.ActaParticipante);
    // setMostrarPartPopup(true);
}

useEffect(() => {
    async function init() {
        
        try {
            let query = '';
            let acuerdo = await buscarMisActividades(query);
            setAcuerdos(acuerdo)
        }catch (e) {
                toastr.error('Acuerdos', e.message, {position: 'top-center'})
        }
    }
    init();
    
}, [])

const cabecerasTabla = ["NRO","CÓDIGO ACTA", "PROYECTO","EQUIPO","PROFESIONAL","ACTIVIDAD", "PRODUCTO","DESCRIPCION","ASISTENCIA", "FECHA INCIO", "FECHA COMPROMISO","ALERTA","ESTADO"]

  return (
    <div>
        <Row12 title={"Mis Actividades"}>
            <div className="panel panel-default">
                <TableAcuerdo cabecera={cabecerasTabla}>
                {acuerdos.rows.map((acuerdo, i) => (
                    <RowAcuerdo nro={i} acuerdo={acuerdo} loadParticipantes={cargarPopupParticipantes} showaction={true}  ></RowAcuerdo>
                ))}
                </TableAcuerdo>
           </div>
        </Row12>

    </div>
  );
};
