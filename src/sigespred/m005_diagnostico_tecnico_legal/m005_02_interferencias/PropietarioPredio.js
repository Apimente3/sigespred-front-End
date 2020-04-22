import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../m000_common/headers/Header";
import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import Propietario from "./Propietario";
import UploadMultiple from "../../../components/helpers/uploaders/UploadMultiple";
import ModalAddPredio from "./ModalAddPredio";


import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors} from "../../../config/axios";
import ModalAddPropietario from "./ModalAddPropietario";
import ModalAddPoseedor from "./ModalAddPoseedor";
import {listar} from "../../../actions/sujeto_pasivo/Actions";
import Poseedor from "./Poseedor";
import ModalAddOcupante from "./ModalAddOcupante";
import Ocupante from "./Ocupante";


const Axios = initAxiosInterceptors();


async function tipo_propietario_server() {
    const {data} = await Axios.get(`/tipo_propietario`);
    return data;
}

async function condicion_propietario_server() {
    const {data} = await Axios.get(`/condicion_propietario`);
    return data;
}


async function getPredio(codigo) {
    const {data} = await Axios.get(`/obtenerPredio/${codigo}`);
    return data;
}

async function save_propietario(propietario) {
    const {data} = await Axios.post(`/save_propietario`, propietario);
    return data;
}

async function list_propietario(predio_id) {

    const {data} = await Axios.get(`/list_propietario?predio_id=${predio_id}`);
    return data;
}


const PropietarioPredio = ({match}) => {

    /*Generales */
    let [tipo_propietario, set_tipo_propietario] = useState([]);
    let [condicion_propietario, set_condicion_propietario] = useState([]);
    const {codigo} = match.params;

    const [predio, setPredio] = useState({});
    const [addPropietario, set_addPropietario] = useState(false);
    const [addPosesionario, set_addPosesionario] = useState(false);
    const [addOcupante, set_addOcupante] = useState(false);
    const [filesstate, setFilesstate] = useState(false);


    /**/

    const [propietario, set_propietarios] = useState({integrantes: [],ocupantes: [],poseedores: [], files_acreditan: []});


    useEffect(() => {

        async function initialLoad() {
            try {
                const rpredio = await getPredio(codigo)
                setPredio(rpredio);
                set_propietarios({...propietario, predio_id: rpredio.id});
                set_tipo_propietario(await tipo_propietario_server());
                set_condicion_propietario(await condicion_propietario_server());
                let rpropietario = await list_propietario(rpredio.id)
                // alert(JSON.stringify(rpropietario))

                set_propietarios({...propietario, ...rpropietario});

            } catch (error) {
                console.log(error);
            }
        }

        initialLoad();

    }, []);


    

    const setFiles =async (file) => {
       await set_propietarios({...propietario, files_acreditan: [...propietario.files_acreditan, file]})
       
        
    }

    const removeFiles = (id) => {
        let files_filtered = propietario.files_acreditan.filter(file =>
            file.id !== id
        );
        set_propietarios({...propietario, files_acreditan: files_filtered})
    }

    /*Agregar Files Propietario*/

    const getFilesPropietario = () => {
        return propietario.files_acreditan
    }

    const closeModal_Propietario = () => {
        set_addPropietario(false)
    }

    const closeModal_Poseedor = () => {
        set_addPosesionario(false)
    }

    const closeModal_Ocupante = () => {
        set_addOcupante(false)
    }


    /**/
    async function handleInputChange_Propietario(e) {
        await set_propietarios({
            ...propietario,
            [e.target.name]: e.target.value.toUpperCase()
        });
      
    }


    const savePropietario = async () => {
        try {
            let prop = await {...propietario, predio_id: predio.id};
            console.log(prop)
            await save_propietario(prop);
            toastr.info('Se guardo correctamente los datos del PROPIETARIO.')
        } catch (e) {
            alert(e);
        }

    }

    /*PROPIETARIOS*/

    const setIntegrantes = (integrante) => {
        set_propietarios({...propietario, integrantes: [...propietario.integrantes, integrante]})
    }

    const removeIntegrantes = async (id) => {
        let filtered = propietario.integrantes.filter(integrante =>
            integrante.id !== id
        );
        await set_propietarios({...propietario, integrantes: filtered})
    }

    const editarIntegrantes = async (integrante) => {
        await set_propietarios(
            {
                ...propietario,
                integrantes: propietario.integrantes.map(prop => {

                        if (prop.id == integrante.id) {
                            return integrante;
                        } else {
                            return prop;
                        }
                    }
                )
            }
        )

    }


    /*Poseedores*/

    const setPoseedores = (poseedor) => {
        set_propietarios({...propietario, poseedores: [...propietario.poseedores, poseedor]})
    }

    const removePoseedores = async (id) => {
        let filtered = propietario.poseedores.filter(poseedor =>
            poseedor.id !== id
        );
        await set_propietarios({...propietario, poseedores: filtered})
    }

    const editarPoseedores = async (poseedor) => {
        await set_propietarios(
            {
                ...propietario,
                poseedores: propietario.poseedores.map(prop => {

                        if (prop.id == poseedor.id) {
                            return poseedor;
                        } else {
                            return prop;
                        }
                    }
                )
            }
        )

    }


    /*Poseedores*/

    const setOcupantes = (ocupantes) => {
        set_propietarios({...propietario, ocupantes: [...propietario.ocupantes, ocupantes]})
    }

    const removeOcupantes = async (id) => {
        let filtered = propietario.ocupantes.filter(ocupante =>
            ocupante.id !== id
        );
        await set_propietarios({...propietario, ocupantes: filtered})
    }

    const editarOcupantes = async (ocupante) => {
        await set_propietarios(
            {
                ...propietario,
                ocupantes: propietario.ocupantes.map(prop => {

                        if (prop.id == ocupante.id) {
                            return ocupante;
                        } else {
                            return prop;
                        }
                    }
                )
            }
        )

    }


    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <form>
                <div className="container mtop-20">

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext"><h4>PROPIETARIO</h4></legend>
                            </fieldset>


                            <div>


                                <div className="form-group">

                                    <label className="col-lg-3 control-label"><span
                                        className="obligatorio">* </span> Fecha Inicio Propiedad</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="date"
                                               name="fecha_propiedad"
                                               onChange={handleInputChange_Propietario}
                                              
                                               value={propietario.fecha_propiedad}
                                        ></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label"><span
                                        className="obligatorio">* </span> Tipo Propietario</label>
                                    <div className="col-lg-4">
                                        <select
                                            className="form-control input-sm"
                                            name="tipo_propietario_id"
                                            onChange={handleInputChange_Propietario}
                                           
                                            value={propietario.tipo_propietario_id}
                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            {tipo_propietario.map(tip =>
                                                <option value={tip.id}>{tip.denominacion}</option>
                                            )}


                                        </select>
                                    </div>


                                </div>

                                <div className="form-group">
                                    <label className="col-lg-3 control-label"><span
                                        className="obligatorio">* </span> Condicion de Propiedad</label>
                                    <div className="col-lg-4">
                                        <select id="tipopredio" className="form-control input-sm" name="rol"
                                                name="condicion_propietario_id"
                                                onChange={handleInputChange_Propietario}
                                                value={propietario.condicion_propietario_id}
                                               
                                        >
                                            <option value="0">--SELECCIONE--</option>
                                            {condicion_propietario.map(tip =>
                                                <option value={tip.id}>{tip.denominacion}</option>
                                            )}


                                        </select>
                                    </div>

                                </div>


                                <fieldset className={'fielsettext'}>
                                    <legend align="mtop-25 center fielsettext "><label
                                        className={'titleform'}>Propietarios</label>
                                        <a onClick={() => set_addPropietario(true)} href='#'
                                           className="btn btn-default pull-right btn-sm fullborder btn-control">
                                            + Agregar Propietario
                                        </a>
                                    </legend>

                                </fieldset>

                                {propietario.integrantes.map(prop =>
                                    <Propietario propietario={prop} removeIntegrantes={removeIntegrantes}
                                                 editPropietarios={editarIntegrantes}/>
                                )}


                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="mtop-25 center fielsettext "><label className={'titleform'}><i
                                            className="fa fa-paperclip"></i> Documentos que acreditan la
                                            Propiedad</label> <a onClick={()=>{setFilesstate(true)}}  className="btn btn-default  btn-sm fullborder ">+</a>

                                        </legend>

                                    </fieldset>
                                    {propietario.files_acreditan.length  == 0 && !filesstate ? null :
                                        <UploadMultiple listFiles={propietario.files_acreditan} setListFiles={setFiles}
                                                        removeFiles={removeFiles}/>
                                    }


                                </form>


                            </div>
                            <br/><br/><br/>
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext"><h4>POSEEDORES Y OCUPANTES</h4></legend>
                            </fieldset>


                            <div>

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="mtop-25 center fielsettext "><label
                                            className={'titleform'}>Poseedores</label>
                                            <a onClick={() => set_addPosesionario(true)} href='#'
                                               className="btn btn-default pull-right btn-sm fullborder btn-control">
                                                + Agregar Poseedor
                                            </a>
                                        </legend>

                                    </fieldset>
                                </form>
                                {propietario.poseedores.map(prop =>
                                    <Poseedor propietario={prop} removeIntegrantes={removePoseedores}  editPropietarios={editarPoseedores}/>
                                )}

                                <form>
                                    <fieldset className={'fielsettext'}>
                                        <legend align="mtop-25 center fielsettext "><label
                                            className={'titleform'}>Ocupantes</label>
                                            <a onClick={() => set_addOcupante(true)} href='#'
                                               className="btn btn-default pull-right btn-sm fullborder btn-control">
                                                + Agregar Ocupantes
                                            </a>
                                        </legend>

                                    </fieldset>
                                </form>

                                {propietario.ocupantes.map(prop =>
                                    <Ocupante propietario={prop} removeIntegrantes={removeOcupantes}  editPropietarios={editarOcupantes}/>
                                )}
                                <div className="modal-footer ">
                                    <button id="btnguardar" type="button" onClick={savePropietario}
                                            className="btn btn-danger btn-sm btn-control">
                                        <i className="fa fa-save"></i> GUARDAR
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>


            {addPropietario ? <ModalAddPropietario setIntegrantes={setIntegrantes} removeIntegrantes={removeIntegrantes}
                                                   closeModal={closeModal_Propietario}/> : null}
            {addPosesionario ? <ModalAddPoseedor setIntegrantes={setPoseedores} removeIntegrantes={removePoseedores}
                                                    closeModal={closeModal_Poseedor}/> : null}
            {addOcupante ?  <ModalAddOcupante setIntegrantes={setOcupantes} removeIntegrantes={removeOcupantes}
                                              closeModal={closeModal_Ocupante}/> : null}
        </div>
    );
};


export default PropietarioPredio;