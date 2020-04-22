import React, {useEffect, useState} from 'react';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import FooterProcess from "../m000_common/footers/FooterProcess";
import MapProyecto from '../../components/helpers/maps/MapProyecto';
import MapProyectoEmpy from '../../components/helpers/maps/MapProyectoEmpy'
import Header from "../m000_common/headers/Header";
import {initAxiosInterceptors, filepath} from "../../config/axios";
import {toastr} from "react-redux-toastr";
import SliderDatosGenerales from "./common/SliderDatosGenerales";


const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/

async function cargarDatosProyecto(codigo) {

    try {
        //alert(codigo)
        const {data} = await Axios.get(`/resumen-proyectos-codigo?codigo=${codigo}`);
        //alert(JSON.stringify(data))
        if (data) {
           // localStorage.setItem("PROYECTO_CURRENT", JSON.stringify(data));
            return data;
        }

    } catch (e) {
        toastr.error(JSON.stringify(e))
    }


}

const detalle_equipo = async (equipo_id) => {
    const {data} = await Axios.get(`/details-equipo?equipo_id=${equipo_id}`);
    return data;
}

const DatosGenerales = ({history, match}) => {
    

    const {codigo_predio: cod} = match.params;
    const [solicitudstate, setSolicitudstate] = useState({});
    const [state_detalle_equipo, set_brigada] = useState({});
    //alert(solicitud)
    useEffect(() => {
        async function getSolcitud() {
            try {
                const [soli] = await cargarDatosProyecto(cod);
                // alert(JSON.stringify(soli));
                //  const ldetalle_equipo= await detalle_equipo(soli.brigada_id)
                // set_brigada(ldetalle_equipo)
                //  console.log(soli)
                if (soli) {
                    setSolicitudstate({...soli, foto: filepath(soli.portada_imagen)})
                } else {
                    //  history.push('/no-encontrado')  
                }
            } catch (error) {


            }
        }

        getSolcitud();

    }, [cod]);


    const slideImages = [
        'http://localhost:7000/files/1574945538-drones-dji%20(1).jpg',
        'http://localhost:7000/files/1574945538-drones-dji%20(1).jpg',
        'http://200.121.128.47/cchanel/PD04.JPG'
    ];

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        onChange: (oldIndex, newIndex) => {
            console.log(`slide transition from ${oldIndex} to ${newIndex}`);
        }
    }



    return (
        <>
            <div>
                <SiderBarDiagnostico proyecto={cod}/>

                <form action="">
                    <Header></Header>
                    
                    <div className="container mtop-20">


                        <form>
                            <fieldset className={'fielsettext'}>
                                <legend align="mtop-25 center fielsettext ">

                                    <label className={'titleform'}>DATOS DEL PROYECTO</label>

                                </legend>

                            </fieldset>


                        </form>
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="headline">
                                    {solicitudstate.descripcion}
                                  
                                </h5>
                                <SliderDatosGenerales/>
                              
                            </div>

                            <div className="col-md-6">


                                <div className="panel panel-default" style={{height:'450px'}}>

                                    <form className="form-horizontal no-margin form-border" id="formWizard2"
                                          noValidate="">
                                        <div className="panel-tab clearfix">
                                            <ul className="tab-bar wizard-demo" id="wizardDemo2">
                                                <li className="active"><a href="#first" data-toggle="tab"> Datos del Proyecto</a></li>
                                                <li><a href="#second" data-toggle="tab">
                                                    Brigadas a Cargo</a>
                                                </li>
                                               
                                            </ul>
                                        </div>
                                        <div className="panel-body">
                                            <div className="tab-content">
                                                <div className="tab-pane fade in active" id="first">
                                                    <form className="no-margin" id="formValidate1"
                                                          data-validate="parsley" noValidate="">
                                                        <div className="panel-body">
                                                            <div className="form-group">
                                                                <label className="control-label">Digital del Documento del PMD</label><br/>
                                                                <a href={filepath(solicitudstate.pmd)}
                                                                   style={{color: '#000'}} title={solicitudstate.pmd}>
                                                                    <i className="fa fa-file-pdf-o "></i></a>

                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">Tipo de Infraestructura</label><br/>
                                                                <span>  {solicitudstate.tipo_infraestructura}</span>

                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">Fecha de Registro</label><br/>
                                                                <span>  {solicitudstate.fecha_registro}</span>

                                                            </div>
                                                        </div>
                                                    </form>
                                                  
                                                </div>
                                                <div className="tab-pane fade" id="second">
                                                    <form className="no-margin" id="formValidate1"
                                                          data-validate="parsley" noValidate="">
                                                     

                                                        <div className="panel-body">
                                                            <div className="form-group">
                                                                <label className="control-label">Coordinador Responsable</label><br/>
                                                                <span>Renato Minano Elvar</span>
                                                                
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="control-label">Coordinador Responsable</label><br/>
                                                                <span>Renato Minano Elvar</span>

                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">Coordinador Responsable</label><br/>
                                                                <span>Renato Minano Elvar</span>

                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">Coordinador Responsable</label><br/>
                                                                <span>Renato Minano Elvar</span>

                                                            </div>
                                                           
                                                          
                                                           

                                                           
                                                        </div>
                                                    </form>

                                                </div>
                                              
                                            </div>
                                        </div>
                                       
                                    </form>
                                  
                                </div>
                            </div>

                            <div className="col-md-12">
                            <div className="panel panel-default table-responsive">
                                <div className="panel-heading">
                                    Mapa del Proyecto
                                   
                                </div>
                              <div>
                                  {solicitudstate.polygonojson ?
                                      <MapProyecto predios={solicitudstate.predios}
                                                   geojson={solicitudstate.polygonojson}/> :
                                      <MapProyectoEmpy/>}
                              </div>
                            </div>
                            </div>
                        </div>

                    </div>
                    <div className="row margin-button-form "></div>

                </form>


                <FooterProcess/>
            </div>
        </>
    );
};

export default DatosGenerales;