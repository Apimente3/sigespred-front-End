import React, {useState, useEffect, useRef} from 'react';
import { ELIMINAR_ACTA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
//import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {Link, useParams} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { initAxiosInterceptors } from '../../config/axios';
import ActaAdd from './ActaAdd';

const Axios = initAxiosInterceptors();

const {$} = window;

async function getActa(id) {
    const {data} = await Axios.get(`/acta/${id}`);
    return data;
}


async function deleteActa(acta) {
    const {data} = await Axios.delete(`/acta/${acta.id}`,acta);
    return data;
}


const ActaDel = ({ history, match }) => {
    //const {id} = match.params;
    const { id } = useParams();
    const [acta, set_acta] = useState({ observacion: 'Nuevo Registro'});
    
    useEffect(() => {
        async function init() {
            try {
                let acta = await getActa(id)
                // delete traba.contrasenia
                // traba.contrasenia="****"
                set_acta(acta)
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
      const response= await deleteActa(acta);
      if(response){
          history.push('/acta-list');
      }
    } catch (e) {
      toastr.error(`ERROR !!! No se logro verificar la existencia del acta.`)
    }
  };

  return (
    <Wraper
      titleForm={"Eliminación del acta"}
      listbreadcrumb={ELIMINAR_ACTA_BREADCRUM}
    >
      <form onSubmit={eliminar} className={"form-horizontal"}>
        <div className="form-group">
          <div className="col-xs-6 col-sm-12 col-md-6">
            <strong className="font-16">
              ¿Deseas eliminar el acta con el código {acta.codigoacta}?
            </strong>
            {/* <small className="block text-muted">DNI : {trabajador.dni}</small> */}
          </div>
        </div>

        <div className="panel-body">
          <div className="form-group ">
            <div className="col-lg-offset-2 col-lg-10">
              <Link
                to={`/acta-list`}
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

export default ActaDel;