import React, {useEffect, useState} from 'react';
import Header from "../m000_common/headers/Header";
import {Link} from "react-router-dom";
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import {initAxiosInterceptors} from "../../config/axios";
const Axios = initAxiosInterceptors();

/*Obtiene la solcitud de polygonos*/
async function getDatosConfiguracion(codigo) {
    const {data} = await Axios.get(`/proyecto-configuracion?codigo=${codigo}`);
    return data;
}

const Configuraciones =({history, match}) => {

    const {codproyecto} = match.params;
    const [proyecto_codigo, set_proyecto_codigo] = useState(codproyecto);
    const [configuracion, set_configuracion] = useState({});


    /*Efecto para traer lo datos del sistema*/
    useEffect(() => {
        async function init() {
            try {
                set_configuracion(await getDatosConfiguracion(proyecto_codigo));
             //   alert(JSON.stringify(configuracion))
            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);
    
    return (
        <div>
            <Header/>
            <SiderBarDiagnostico proyecto={codproyecto}/>

            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                        <li className="active">Busqueda de Proyectos</li>
                    </ul>
                </div>
                <div className="padding-md container">


                    <legend align="mtop-25 center fielsettext "><label className={'titleform'}>
                        REGISTRO DE LA BASE GRAFICA
                    </label>

                    </legend>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard2" noValidate="">
                            <div className="panel-tab clearfix">
                                <ul className="tab-bar wizard-demo" id="wizardDemo2">
                                    <li className="active">
                                        <Link to={'/configuraciones-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-cogs"></i>  Configuraciones</Link>
                                    </li>
                                    <li className="">
                                        <Link to={'/base-grafica-ubicacion/' + proyecto_codigo}>
                                            <i className="fa fa-map-marker"></i>   Base Grafica</Link>
                                    </li>
                                    <li className="">
                                        <Link to={'/base-grafica-adjuntos/' + proyecto_codigo}>
                                            <i className="fa fa-photo"></i>    Portada y Archivos</Link>
                                    </li>
                                    <li>
                                        <Link to={'/brigadas-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-users"></i>   Brigadas</Link>

                                    </li>

                                </ul>
                            </div>
                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="first">

                                        <legend align=" center fielsettext "><label className={'titleform'}> Datos del Proyecto</label>
                                        </legend>
                                        <div className="form-group">
                                            <div className="col-lg-12">
                                                <strong className="font-12">
                                                    Codigo del Proyecto
                                                </strong><br/>
                                                <br/>
                                                <p>
                                                    <div className="row">
                                                        <div className="col-lg-10">
                                                            <input required type="text" placeholder="" disabled={true}
                                                                   className="form-control input-sm"
                                                                   name="codigo"
                                                                   value={configuracion.codigo}
                                                            ></input>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <button type="submit" className="btn btn-default btn-sm " disabled={true}
                                                            > Cambiar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="col-lg-12">
                                                <strong className="font-12">
                                                    Denominación del Proyecto
                                                </strong><br/>
                                                <br/>
                                                <p>
                                                    <div className="row">
                                                        <div className="col-lg-10">
                                                            <input required type="text" placeholder="" disabled={true}
                                                                   className="form-control input-sm"
                                                                   name="codigo"

                                                                   value={configuracion.descripcion}
                                                            ></input>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <button type="submit" className="btn btn-default btn-sm  " disabled={true}
                                                            > Cambiar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="col-lg-12">
                                                <strong className="font-12">
                                                    Fecha del registro
                                                </strong><br/>
                                                <br/>
                                                <p>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <input required type="text" placeholder="" disabled={true} readOnly={true}
                                                                   className="form-control input-sm"
                                                                   name="codigo"

                                                                   value={configuracion.fecha_registro}
                                                            ></input>
                                                        </div>
                                                      
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="col-lg-12">
                                                <strong className="font-12">
                                                    Registrado Por
                                                </strong><br/>
                                                <br/>
                                                <p>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <input required type="text" placeholder=""  readOnly={true}
                                                                   className="form-control input-sm"
                                                                   name="codigo"

                                                                   value={configuracion.usuaregistra}
                                                            ></input>
                                                        </div>
                                                       
                                                    </div>
                                                </p>
                                            </div>
                                            
                                        </div>


                                    </div>

                                </div>
                                <br/>
                             
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Configuraciones;