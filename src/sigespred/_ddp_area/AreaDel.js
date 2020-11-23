import React, {useState, useEffect, useRef} from 'react';
import { ELIMINAR_AREA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
//import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {Link, useParams} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { initAxiosInterceptors } from '../../config/axios';

const Axios = initAxiosInterceptors();

const {$} = window;

async function getArea(id) {
    const {data} = await Axios.get(`/area/${id}`);
    return data;
}


async function deleteArea(area) {
    console.log(area)
    const {data} = await Axios.delete(`/area/${area.id}`,area);
    return data;
}


const AreaDel = ({ history, match }) => {
    //const {id} = match.params;
    const { id } = useParams();
    const [area, set_area] = useState({ observacion: 'Nuevo Registro'});
    
    useEffect(() => {
        async function init() {
            try {
                let area = await getArea(id)
                // delete traba.contrasenia
                // traba.contrasenia="****"
                set_area(area)
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
      const response= await deleteArea(area);
      if(response){
          history.push('/area-list');
      }
    } catch (e) {
      toastr.error(`ERROR !!! No se logro verificar la existencia de la area.`)
    }
  };

  return (
    <Wraper
      titleForm={"Eliminacion de la area"}
      listbreadcrumb={ELIMINAR_AREA_BREADCRUM}
    >
      <form onSubmit={eliminar}>
        <div className="form-group">
          <div className="col-xs-6 col-sm-12 col-md-6">
            <strong className="font-16">
              ¿Desea eliminar el area Nro {area.id}?
            </strong>
            {/* <small className="block text-muted">DNI : {trabajador.dni}</small> */}
          </div>
        </div>

        <div className="panel-body">
          <div className="form-group ">
            <div className="col-lg-offset-2 col-lg-10">
              <Link
                to={`/area-list`}
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

export default AreaDel;