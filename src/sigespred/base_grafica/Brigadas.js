import React, {useEffect, useMemo, useState} from 'react';
import Header from "../m000_common/headers/Header";
import {Link} from "react-router-dom";
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import {initAxiosInterceptors, serverFile} from "../../config/axios";
import {toastr} from "react-redux-toastr";

const Axios = initAxiosInterceptors();

/*Obtiene las brigadas asociadas a la solicitud*/
async function getequipobyProy(codigo) {
    try {
        const {data} = await Axios.get(`/equipobyProy?codproy=${codigo}`);
        return data;
    } catch (e) {
        toastr.error(JSON.stringify(e))
    }
}

const Brigadas = ({history, match}) => {

    const {codproyecto} = match.params;
    const [proyecto_codigo, set_proyecto_codigo] = useState(codproyecto);

    const [proyecto, set_proyecto] = useState({integrantes: []});
    const [modalChangeEquip, set_modalChangeEquip] = useState(false);


    /*Efecto para traer lo datos del sistema*/
    useEffect(() => {
        async function init() {
            try {
                set_proyecto(await getequipobyProy(proyecto_codigo));
                //   alert(JSON.stringify(configuracion))
            } catch (error) {
                console.log(error);
            }
        }

        init();
    }, []);
    
    const actualizarBrigada=async ()=>{
        set_proyecto(await getequipobyProy(proyecto_codigo));
    } 

    //Para abri el modal de cambio de equipo

    const opeModal = () => {
        set_modalChangeEquip(true)
    }

    const closeModal = () => {
        set_modalChangeEquip(false)
    }

    const getProyecto=()=>{
        return proyecto;
    }


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
                                    <li className="">
                                        <Link to={'/configuraciones-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-cogs"></i> Configuraciones</Link>
                                    </li>
                                    <li>
                                        <Link to={'/base-grafica-ubicacion/' + proyecto_codigo}>
                                            <i className="fa fa-map-marker"></i> Base Grafica</Link>
                                    </li>
                                    <li className="">
                                        <Link to={'/base-grafica-adjuntos/' + proyecto_codigo}>
                                            <i className="fa fa-photo"></i> Portada y Archivos</Link>
                                    </li>
                                    <li className="active">
                                        <Link to={'/brigadas-proyecto/' + proyecto_codigo}>
                                            <i className="fa fa-users"></i> Brigadas</Link>

                                    </li>


                                </ul>
                            </div>
                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="first">

                                        <legend align=" center fielsettext "><label className={'titleform'}> Brigadas a
                                            Cargo</label>
                                        </legend>

                                        <div className="col-lg-12">
                                            <strong className="font-12">
                                                Brigada a Cargo
                                            </strong><br/>
                                            <br/>
                                            <p>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <input required type="text" placeholder="" disabled={true}
                                                               className="form-control input-sm"
                                                               name="codigo"

                                                               value={proyecto.brigada_cargo}
                                                        ></input>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button onClick={opeModal} type="button"
                                                                className="btn btn-default btn-sm  btn-control"
                                                        > Cambiar
                                                        </button>
                                                    </div>
                                                </div>
                                            </p>
                                        </div>
                                        <div className="col-lg-6">
                                            <strong className="font-12">
                                                Fecha Asignacion
                                            </strong><br/>
                                            <br/>
                                            <p>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <p>{proyecto.fechaasig}</p>
                                                    </div>

                                                </div>
                                            </p>
                                        </div>
                                        <div className="col-lg-6">
                                            <strong className="font-12">
                                                Asignado por
                                            </strong><br/>
                                            <br/>
                                            <p>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <p>{proyecto.usuaregistra}</p>
                                                    </div>

                                                </div>
                                            </p>
                                        </div>


                                        <legend align=" center fielsettext "><label
                                            className={'titleform'}> Integrantes</label>
                                        </legend>

                                        <legend align=" center fielsettext "><label className={'titleform'}
                                                                                    style={{fontSize: '11px'}}> Coordinador
                                            Responsable</label>
                                        </legend>
                                        <div className="row">
                                            {proyecto.resposable ?
                                                <Integrante integrante={{
                                                    foto: proyecto.resposable.foto,
                                                    nombres: `${proyecto.resposable.nombres} ${proyecto.resposable.apellidos}`,
                                                    tipo_integrante: 'Coordinador',
                                                    cargo: proyecto.resposable.cargo,
                                                    telefonos: proyecto.resposable.telefonos,
                                                    correo: proyecto.resposable.correo,

                                                }}>
                                                </Integrante> : ''
                                            }


                                        </div>


                                        <legend align=" center fielsettext "><label className={'titleform'}
                                                                                    style={{fontSize: '11px'}}> Brigadistras</label>
                                        </legend>

                                        <div className="row">

                                            {proyecto.integrantes.map(integrante =>
                                                <Integrante key={integrante.id}
                                                            integrante={integrante}/>
                                            )}
                                        </div>


                                    </div>

                                </div>
                                <br/>

                            </div>

                        </form>
                    </div>
                </div>

            </div>

            {modalChangeEquip ?
                <ModalChangeEquipo closeModal={closeModal} getProyecto={getProyecto} actualizarBrigada={actualizarBrigada}></ModalChangeEquipo>
                : ''}

        </div>
    );
};


const Integrante = ({integrante}) => {

    const {id, foto, nombres, tipo_integrante, cargo, telefonos, correo} = integrante;


    return (
        <>
            <div className="col-md-4 col-sm-4">
                <div className="panel avatar-team">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <a href="#" className="pull-left ">
                                    <img src={foto == 'img/userblank.jpg' ? '/' + foto : serverFile + foto}
                                         className="img-circle foto-trabajador" alt="User Avatar"/>
                                </a>
                            </div>
                            <div className="col-md-8 col-sm-8">


                                <strong className="font-14 block">{nombres} </strong>
                                <small className="text-muted"><i className="fa fa-id-card"
                                                                 aria-hidden="true"></i> {tipo_integrante}</small>
                                <br/>
                                <small className="text-muted"><i className="fa fa-user-circle-o"
                                                                 aria-hidden="true"></i> {cargo}</small>
                                <br/>
                                <small className="text-muted"><i className="fa fa-phone"
                                                                 aria-hidden="true"></i> {telefonos}</small>
                                <br/>
                                <small className="text-muted"><i className="fa fa-envelope"
                                                                 aria-hidden="true"></i> {correo}</small>
                                <br/>


                            </div>
                        </div>

                        <div className="pull-left m-left-sm">


                        </div>
                    </div>
                </div>
            </div>
        </>
    )


};


/*Obteniendo la lista de resposables */
let initialEquipos = []

async function cargarResponsablescall() {
    const {data: {responsables, equipos}} = await Axios.get(`/responsables`);
    initialEquipos = equipos;
    return {responsables, equipos};
}


async function saveproyecto(proyecto) {

    const {data} = await Axios.post(`/saveproyecto`, proyecto);
    // let result = JSON.parse(data[0].geojson_3857);
    return data;
}


const ModalChangeEquipo = ({closeModal, getProyecto,actualizarBrigada}) => {


    const [proyecto, set_proyecto] = useState({});

    const [resposables, setResposables] = useState([]);// estado de los resposables
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const init = async () => {
            const {responsables, equipos} = await cargarResponsablescall();
            setResposables(responsables);
            set_proyecto({...getProyecto(),responsable_id:'0',brigada_id:'0'});//Obiene el proyecto actual
        };
        init();
    }, []);

    function handleInputChange(e) {
        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }


    /*Filtro del eqquipo*/
    const filtrarEquipo = (e) => {

        let equipoFilter = initialEquipos.filter(row => {
            return row.coordinador_id == e.target.value;
        });
        console.log(equipoFilter)
        setEquipos(equipoFilter);
    }

    const seleccionarBrigada = (brigada_id) => {
        set_proyecto({...proyecto, brigada_id})
    }
    //Permite guardar la anueva asignacion de la brigada
    const cambiarBrigada = async (e) => {
        
        try {
            e.preventDefault();
            if(!proyecto.responsable_id || proyecto.responsable_id=='0'){
                throw {error: " Seleccion un responsable.  "}
            }
            if(!proyecto.brigada_id || proyecto.brigada_id=='0'){
                throw {error: " Seleccion una Brigada.  "}
            }
            await guardarProyecto();
        }catch (e) {
            console.log(e);
            toastr.error(e.error);
        }
       
    }

    //Guarda slos datos de la brigada 
    async function guardarProyecto() {

        try {
            
            let objectsave={
                id:proyecto.proyecto_id,
                responsable_id:proyecto.responsable_id,
                brigada_id:proyecto.brigada_id,
                fech_asig_brigada:proyecto.fech_asig_brigada
            }


            const toastrConfirmOptions = {
                okText: 'Cambiar Brigada',
                cancelText: 'Cancelar',
                onOk: async () =>{await saveproyecto(objectsave);  toastr.info('Se guardo correctamente');actualizarBrigada();closeModal();} ,
                onCancel: () => console.log('CANCEL: clicked')
            };
            toastr.confirm('¿ Desea cambiar la Brigada encargada a este Proyecto ?', toastrConfirmOptions);
            
            
            
          
        } catch (e) {
            toastr.error('Error al guardar')
        }
    }


    return (
        <>
            <div id="" className="popup_background lightCustomModal_background"></div>
            <div className="popup_wrapper lightCustomModal_wrapper">
                <div className="custom-popup light width-100 popup_content popup_content_visible lightCustomModal"
                     data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_73263850"
                     tabIndex="-1">
                    <div className="padding-md">
                        <h4 className="m-top-none"> Seleccione la Brigada</h4>
                    </div>


                    <div className="row">
                        <div className="panel-body">
                            <form onSubmit={cambiarBrigada}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Coordinador Responsable</label>
                                    <select className="form-control input-sm" name="responsable_id" onChange={(e) => {
                                        handleInputChange(e);
                                        filtrarEquipo(e);
                                    }}>
                                        <option value="0">-- SELECCIONE --</option>
                                        {resposables.map(resp =>
                                            <option key={resp.id} value={resp.id}>{resp.responsable}</option>
                                        )};
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Fecha de Asignacion</label>
                                    <input required className="form-control input-sm" type="date" placeholder=""
                                           name="fech_asig_brigada"
                                           onChange={handleInputChange} value={proyecto.fech_asig_brigada}>
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Brigadas</label>
                                    <div className="col-lg-12">

                                        {equipos.map(item =>
                                            <div className="col-lg-3" style={{
                                                border: '0px solid #dedede',
                                                padding: '2px',
                                                marginLeft: '2px',
                                                borderRadius: '5px'
                                            }}>
                                                <div className="thumbnail" style={{height: '220px'}}>
                                                    <div className="caption">
                                                        <h6><b> <input name={'brigada'} type="radio" onClick={() => {
                                                            seleccionarBrigada(item.id)
                                                        }
                                                        }></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`${item.denominacion}`}
                                                        </b></h6>
                                                        {
                                                            item.integrantes.map(value =>
                                                                    (<>
                                                                        <hr/>
                                                                        <span style={{color: '#498AF5'}}>
                                                    {value.denominacion} </span>
                                                                        <div className="pull-left m-left-sm">
                                                                            <span
                                                                                style={{fontSize: '10px'}}>{`${value.int_nombres} ${value.int_apellidos}`}</span><br/>
                                                                            <small className="text-muted"><span
                                                                                style={{color: '#FB5A43'}}> {value.cargo}</span>
                                                                            </small>
                                                                        </div>
                                                                    </>)
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <div className="text-center">
                                        <button type="submit"
                                                className="btn btn-success m-right-sm lightCustomModal_close btn-control">Cambiar
                                        </button>
                                        <a onClick={closeModal} href="#"
                                           className="btn btn-danger lightCustomModal_close btn-control">Cancelar</a>
                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>


                </div>
                <div className="popup_align popup_align2"></div>
            </div>
        </>
    )
}
export default Brigadas;