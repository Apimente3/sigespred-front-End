import React, {useState, useEffect, useRef} from 'react';
import { ELIMINAR_EQUIPO_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/Wraper";
//import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {Link, useParams} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { initAxiosInterceptors } from '../../config/axios';

const Axios = initAxiosInterceptors();

const {$} = window;

async function getEquipo(id) {
    const {data} = await Axios.get(`/equipo/${id}`);
    return data;
}


async function deleteEquipo(equipo) {
    console.log(equipo)
    const {data} = await Axios.delete(`/equipo/${equipo.id}`,equipo);
    return data;
}


const EquipoDel = ({ history, match }) => {
    //const {id} = match.params;
    const { id } = useParams();
    const [equipo, set_equipo] = useState({ observacion: 'Nuevo Registro'});
    
    useEffect(() => {
        async function init() {
            try {
                let equipo = await getEquipo(id)
                // delete traba.contrasenia
                // traba.contrasenia="****"
                set_equipo(equipo)
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);


  const eliminar = async (e) => {
    e.preventDefault();
    $("#btnguardar").button("loading");
    try {
      const response= await deleteEquipo(equipo);
      if(response){
          history.push('/list-equipos2');
      }
    } catch (e) {
      toastr.error(`ERROR !!! No se logro verificar la existencia del equipo.`)
    }
  };

  return (
    <Wraper
      titleForm={"Eliminacion del Equipo"}
      listbreadcrumb={ELIMINAR_EQUIPO_BREADCRUM}
    >
      <form onSubmit={eliminar}>
        <div className="form-group">
          <div className="col-xs-6 col-sm-12 col-md-6">
            <strong className="font-16">
              ¿Desea eliminar el equipo Nro {equipo.id}?
            </strong>
            {/* <small className="block text-muted">DNI : {trabajador.dni}</small> */}
          </div>
        </div>

        <div className="panel-body">
          <div className="form-group ">
            <div className="col-lg-offset-2 col-lg-10">
              <Link
                to={`/list-equipos2`}
                className="btn btn-default btn-sm btn-control"
              >
                Cancelar
              </Link>
              <button
                id="btnguardar"
                type="submit"
                className="btn btn-danger btn-sm btn-control"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </form>
    </Wraper>
  );
};

export default EquipoDel;