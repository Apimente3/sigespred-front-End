import React, {useEffect, useState} from 'react';
import Header from "../../m000_common/headers/Header";
import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import Propietario from "./Propietario";
import UploadMultiple from "../../../components/helpers/uploaders/UploadMultiple";

import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors} from "../../../config/axios";
import ModalAddPropietario from "./ModalAddPropietario";
import ModalAddPoseedor from "./ModalAddPoseedor";
import ModalAddExpediente from "../expedientes/ModalAddExpediente";
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
    const [addExpediente, setExpediente] = useState(false); // Permite controlar el estado del modal del agregar expediente

    const [preDataExp, set_preDataExp] = useState({}); // Permite controlar el estado del modal del agregar expediente
    /**/
    const [propietario, set_propietarios] = useState({
        integrantes: [],
        ocupantes: [],
        poseedores: [],
        files_acreditan: []
    });
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


    const setFiles = async (file) => {
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

    const closeModal_AddExpediente = () => {
        setExpediente(false)
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

            if (!propietario.fecha_propiedad) {
                throw {error: " Seleccione la Fecha Propiedad. "}
            }
            if (!propietario.tipo_propietario_id) {
                throw {error: " Seleccione el Tipo de Propietario. "}
            }
            if (!propietario.condicion_propietario_id) {
                throw {error: " Seleccione la condicion del Propietario. "}
            }

            let prop = await {...propietario, predio_id: predio.id};
            console.log(prop)
            await save_propietario(prop);
            toastr.info('Se guardo correctamente los datos del PROPIETARIO.')
        } catch (err) {
            toastr.error(err.error)
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

    /*Permite generar el epediente para un propietario*/
    const generarEpxPropietario = () => {
        console.log(propietario.integrantes);
        let resumentitular = [];
        let resumendocumentos = [];

        for (let propiert of propietario.integrantes) {
            resumentitular.push(`${propiert.nombres}${propiert.apellidos}`)
            resumendocumentos.push(propiert.nro_documento);
        }
        console.log(resumentitular.join(','));
        console.log(resumendocumentos.join(','));
        console.log(predio);
        set_preDataExp({
            resumen_titular: resumentitular.join(' , '),
            resumen_documentos: resumendocumentos.join(' , '),
            integrantes: propietario.integrantes,
            tipoexpediente: '1',
            predio_codigo: predio.codigo,
            proyecto_codigo: predio.codigo_proyecto,
            predio_id: predio.id
        });

        setExpediente(true);
        savePropietario()
    }

    const getPredataExpediente = () => {
        return preDataExp;
    }


    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>

            <form>
                <div className="container mtop-20">
                    <form>
                        <fieldset className={'fielsettext'}>
                            <legend align="mtop-25 center fielsettext ">
                                <label className={'titleform'}>REGISTRO DE SUJETO PASIVO</label>
                            </legend>
                        </fieldset>
                    </form>
                    <div className="row">

                        <div className="panel-tab">
                            <ul className="tab-bar wizard-demo" id="wizardDemo1">
                                <li className="active">
                                    <a href="#wizardContent1" data-toggle="tab">1. Propietarios</a>
                                </li>
                                <li>
                                    <a href="#wizardContent2" data-toggle="tab">2. Posesionarios</a>
                                </li>
                                <li>
                                    <a href="#wizardContent3" data-toggle="tab">3. Ocupantes</a>
                                </li>

                            </ul>
                        </div>

                        <div className="tab-content">
                            <div className="tab-pane fade in active" id="wizardContent1">

                                <div className="panel panel-default">
                                    <div className="panel-heading"> <fieldset className={'fielsettext'}>
                                        <legend align="center fielsettext"><h5>REGISTRO DEL PROPIETARIO</h5></legend>
                                    </fieldset></div>
                                    <div className="panel-body">
                                        <form className="form-horizontal">
                                            <div className="form-group">
                                                <label className="col-lg-3 control-label"><span
                                                    className="obligatorio">* </span> Fecha Inicio Propiedad :</label>
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
                                                    className="obligatorio">* </span> Tipo Propietario :</label>
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
                                                    className="obligatorio">* </span> Condicion de Propiedad :</label>
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

                                        </form>
                                        <fieldset className={'fielsettext'}>
                                            <legend align="mtop-25 center fielsettext "><label style={{fontSize:'11px'}}
                                                                                               className={'titleform'}>Listado de Propietarios</label>
                                                <a onClick={() => set_addPropietario(true)} href='#'
                                                   className="btn btn-default pull-right btn-sm fullborder btn-control">
                                                    + Agregar Propietario
                                                </a>
                                            </legend>
                                        </fieldset>
                                        <table className="table table-bordered table-condensed table-hover table-striped">
                                            <thead>
                                            <tr>
                                                <th >Nombres</th>
                                                <th>DNI</th>
                                                <th>Telefonos</th>
                                                <th>Direccion</th>
                                                <th className="pull-right">Acciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {propietario.integrantes.map(prop =>
                                                <Propietario propietario={prop} removeIntegrantes={removeIntegrantes}
                                                             editPropietarios={editarIntegrantes}/>
                                            )}
                                            </tbody>

                                        </table>
                                        <form>
                                            <fieldset className={'fielsettext'}>
                                                <legend align="mtop-25 center fielsettext "><label className={'titleform'} style={{fontSize:'11px'}}><i
                                                    className="fa fa-paperclip"></i> Documentos que acreditan la
                                                    Propiedad</label> <a onClick={() => {
                                                    setFilesstate(true)
                                                }} className="btn btn-default  btn-sm fullborder ">+</a>

                                                </legend>

                                            </fieldset>


                                            {propietario.files_acreditan.length == 0 && !filesstate ? null :
                                                <UploadMultiple listFiles={propietario.files_acreditan} setListFiles={setFiles}
                                                                removeFiles={removeFiles}/>
                                            }


                                        </form>



                                    </div>
                                    <div className="modal-footer">
                                        <button id="btnguardar" type="button" onClick={savePropietario}
                                                className="btn btn-danger btn-sm btn-control">
                                            <i className="fa fa-save"></i> GUARDAR
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="wizardContent2">

                                <div className="row">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <fieldset className={'fielsettext'}>
                                                <legend align="center fielsettext"><h5>POSEEDORES </h5></legend>
                                            </fieldset>
                                        </div>
                                        <div className="panel-body">
                                            <form className="form-horizontal">
                                                <form>
                                                    <fieldset className={'fielsettext'}>
                                                        <legend align="mtop-25 center "><label style={{fontSize:'11px'}}
                                                            className={'titleform'}>Listado de Poseedores</label>
                                                            <a onClick={() => set_addPosesionario(true)} href='#'
                                                               className="btn btn-default pull-right btn-sm fullborder btn-control">
                                                                + Agregar Poseedor
                                                            </a>
                                                        </legend>

                                                    </fieldset>
                                                </form>

                                                <table className="table table-bordered table-condensed table-hover table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th >Nombres</th>
                                                        <th>DNI</th>
                                                        <th>Telefonos</th>
                                                        <th>Direccion</th>
                                                        <th className="pull-right">Acciones</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                {propietario.poseedores.map(prop =>
                                                    <Poseedor propietario={prop} removeIntegrantes={removePoseedores}
                                                              editPropietarios={editarPoseedores}/>
                                                )}
                                                    </tbody>
                                                </table>
                                            </form>



                                        </div>
                                        <div className="modal-footer">
                                            <button id="btnguardar" type="button" onClick={savePropietario}
                                                    className="btn btn-danger btn-sm btn-control">
                                                <i className="fa fa-save"></i> GUARDAR
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="tab-pane fade" id="wizardContent3">
                                <div className="row">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <fieldset className={'fielsettext'}>
                                                <legend align="center fielsettext"><h5>OCUPANTES </h5></legend>
                                            </fieldset>
                                        </div>
                                        <div className="panel-body">
                                            <form>
                                                <fieldset className={'fielsettext'}>
                                                    <legend align="mtop-25 center fielsettext "><label style={{fontSize:'11px'}}
                                                        className={'titleform'}>Listado de Ocupantes</label>
                                                        <a onClick={() => set_addOcupante(true)} href='#'
                                                           className="btn btn-default pull-right btn-sm fullborder btn-control">
                                                            + Agregar Ocupantes
                                                        </a>
                                                    </legend>

                                                </fieldset>
                                            </form>

                                            <table className="table table-bordered table-condensed table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th >Nombres</th>
                                                    <th>DNI</th>
                                                    <th>Telefonos</th>
                                                    <th>Direccion</th>
                                                    <th className="pull-right">Acciones</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                            {propietario.ocupantes.map(prop =>
                                                <Ocupante propietario={prop} removeIntegrantes={removeOcupantes}
                                                          editPropietarios={editarOcupantes}/>
                                            )}
                                                </tbody>
                                            </table>



                                        </div>
                                        <div className="modal-footer">
                                            <button id="btnguardar" type="button" onClick={savePropietario}
                                                    className="btn btn-danger btn-sm btn-control">
                                                <i className="fa fa-save"></i> GUARDAR
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    {/**/}



                </div>

            </form>


            {addPropietario ? <ModalAddPropietario setIntegrantes={setIntegrantes} removeIntegrantes={removeIntegrantes}
                                                   closeModal={closeModal_Propietario}/> : null}
            {addPosesionario ? <ModalAddPoseedor setIntegrantes={setPoseedores} removeIntegrantes={removePoseedores}
                                                 closeModal={closeModal_Poseedor}/> : null}
            {addOcupante ? <ModalAddOcupante setIntegrantes={setOcupantes} removeIntegrantes={removeOcupantes}
                                             closeModal={closeModal_Ocupante}/> : null}

            {addExpediente ? <ModalAddExpediente getPredataExpediente={getPredataExpediente}
                                                 closeModal={closeModal_AddExpediente}/> : null}
        </div>
    );
};


export default PropietarioPredio;