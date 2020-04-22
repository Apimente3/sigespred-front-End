import React, {useState} from 'react';
import Header from "../../header/Header";
import {Link} from "react-router-dom";
import FooterProcess from "../../gestionPredios/FooterProcess";
import SidebarAdm from "../SidebarAdm";
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";

const Axios = initAxiosInterceptors();

async function deleteSolicitud(payload) {
    const {data} = await Axios.delete(`/solicitud`,{ data: payload } );
    return data;
}


const SolicitudDel = ({history, match}) => {

    const {codsolicitud: codigosolicitud} = match.params;
    const [solicitud,setSolicitud]=useState({});
    
    const handlechange=(e)=>{
        e.preventDefault();
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value.trim()
        });
    }
    
    const eliminar=async (e)=>{
        e.preventDefault();
        try {
          const response= await deleteSolicitud(solicitud);
          if(response){
              history.push('/solicitudes');
          }
              
        }catch (e) {
            //alert(e.error);
            toastr.error(`ERROR !!! No se logro verificar la existencia de esa solicitud.`)
         //   console.log(JSON.stringify(e))
        }
   
    }
    
    
    return (
        <div>
            <SidebarAdm/>
            <form action="">

                <Header></Header>
                <div className="container mtop-20">
                    <h4 className="headline ">
                        Eliminación de la Solicitud Gestión Predial:  <b>{codigosolicitud}</b>
                        <span className="line"></span>
                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <h5>Eliminacion Solicitud</h5>
                        </div>
                        <div className="panel-body">
                            <form action="" onSubmit={eliminar} >

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Nº
                                        Codigo de la Solicitud</label>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm" type="text"
                                               placeholder="Confirme el codigo del Solicitud a ELIMINAR"
                                               name="denominacion"
                                               onChange={handlechange}
                                               value={solicitud.denominacion}
                                        ></input>
                                    </div>
                                </div>


                                <div className="form-group ">
                                    <label className="col-lg-2 control-label">Motivo de Eliminacion </label>
                                    <div className="col-lg-6">
                                <textarea required className="form-control input-sm"
                                          placeholder="Ingrese el Motivo de la Eliminacion"
                                          name="observacion"
                                          onChange={handlechange}
                                          value={solicitud.observacion}
                                >
                                  
                                </textarea>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="panel-body">
                                    <div className="form-group ">
                                        <div className="col-lg-offset-2 col-lg-10">
                                            <button id="btnguardar" type="submit"
                                                    className="btn btn-danger btn-sm btn-control">Eliminar
                                            </button>
                                            <Link to={`/solicitudes`}
                                                  className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                        </div>

                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row margin-button-form "></div>

            </form>
            <FooterProcess/>
        </div>
    );
};

export default SolicitudDel;