import React, {useState, useEffect, useRef} from 'react';
import { ELIMINAR_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/Wraper";
//import {initAxiosInterceptors, serverFile} from '../../../config/axios';
import {Link, useParams} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import { initAxiosInterceptors } from '../../config/axios';

const Axios = initAxiosInterceptors();

const {$} = window;

async function getPartida(id) {
    const {data} = await Axios.get(`/partidaregistral?id=${id}`);
    return data;
}


async function deletePartida(partida) {
    console.log(partida)
    const {data} = await Axios.delete(`/partidaregistral/${partida.id}`,partida);
    return data;
}


const PartidaDel = ({ history, match }) => {
    //const {id} = match.params;
    const { id } = useParams();
    const [partida, set_partida] = useState({ observacion: 'Nuevo Registro'});
    
    useEffect(() => {
        async function init() {
            try {
                let partReg = await getPartida(id)
                // delete traba.contrasenia
                // traba.contrasenia="****"
                set_partida(partReg)
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }
        init();
    }, []);


  const eliminar = async (e) => {
    e.preventDefault();
    //$("#btnguardar").button("loading");
    try {
     

      const toastrConfirmOptions = {
        onOk: () => deletePartida(partida),
        onCancel: () => history.push("/partidas"),
      };
      toastr.confirm("¿ Desea seguir registrando ?", toastrConfirmOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Wraper
      titleForm={"Eliminacion del Trabajador"}
      listbreadcrumb={ELIMINAR_PARTIDA_BREADCRUM}
    >
      <form onSubmit={eliminar}>
        <div className="form-group">
          <div className="col-xs-6 col-sm-12 col-md-6">
            <strong className="font-16">
              ¿Desea eliminar la partida registral Nro {partida.id}?
            </strong>
            {/* <small className="block text-muted">DNI : {trabajador.dni}</small> */}
          </div>
        </div>

        <div className="panel-body">
          <div className="form-group ">
            <div className="col-lg-offset-2 col-lg-10">
              <Link
                to={`/partidas`}
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

export default PartidaDel;
