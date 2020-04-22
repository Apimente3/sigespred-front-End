import React, {useState} from 'react';
import FileBase64 from "react-file-base64";

const Propietario = ({props}) => {
    const [edit, setEdit] = useState(false);

    const [foto, guardarFoto] = useState('/img/userblank.jpg');

    const {progresivaInicio, progresivaFinal, file_id} = props

    const modeEdit=(e)=>{
        e.preventDefault()
        setEdit(true)
    }

    const cancelEdir=(e)=>{
        e.preventDefault()
        setEdit(false)
    }
    const getFiles = (files) => {
        console.log(files)
      //  guardarFoto(files[0].base64)
    }


    return (
        <>

            { edit ? (

                    <div className="panel-body addTramo">
                        <fieldset className={'fielsettext'}>
                            <legend align="center fielsettext">Actualizacion del Propietario</legend>
                        </fieldset>
                        <form className="innerForm">
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>
                                    Foto</label>
                                <div className="col-lg-4">
                                    <div className="col-xs-6 col-sm-12 col-md-6 text-center">
                                        <a href="#">
                                            <img src={foto} alt="User Avatar" className="img-thumbnail"></img>
                                        </a>
                                        <center>
                                            <form className="md-form">
                                                <div className="file-field">

                                                    <div className="file-path-wrapper">
                                                        <div className="input-group">

                                                            <div className="input-group-btn">
                                                                <div className="fileUpload btn btn-success">
                                                                        <span><i
                                                                            className="glyphicon glyphicon-upload"></i> Subir</span>

                                                                    <FileBase64 className="upload"
                                                                                multiple={true}
                                                                                onDone={getFiles.bind(this)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </center>
                                    </div>

                                </div>


                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Nombres</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>

                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Apellidos</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> DNI /RUC</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>

                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Telefonos</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Correo</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>

                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Direccion</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Dificultad</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>

                                <label className="col-lg-2 control-label"><span
                                    className="obligatorio">* </span> Edad</label>
                                <div className="col-lg-4">
                                    <input className="form-control input-sm" type="text"
                                           placeholder="" />
                                </div>
                            </div>


                            <hr/>
                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-8 col-lg-10">
                                        <button id="btnguardar" type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>
                                        <button onClick={cancelEdir}
                                                className="btn btn-default btn-sm btn-control">Cancelar
                                        </button>

                                    </div>

                                </div>

                            </div>


                        </form>
                    </div>
                ):

                (      <div>
                    <li className="list-group-item clearfix trabajdorlist propietarioborder">
                        <div className="padding-trabajador">
                            <div className="clearfix ">


                                <div>
                                    <div className="col-md-4">
                                        <a href="#" className="pull-left m-right-sm">
                                            <img src={foto} className="img-circle fototrabajador-list2"
                                                 alt="User Avatar"></img>
                                        </a>
                                        <div className="pull-left m-left-sm">
                                            <span>{`Renato Monano`}</span><br></br>
                                            <small className="text-muted">Propietario</small>
                                        </div>

                                    </div>
                                    <div className="col-md-8">

                                        <div className="pull-left m-left-sm ">
                                            <span><i className="fa fa-id-card-o" aria-hidden="true"></i> {'10802625151'}</span><br></br>
                                            <small
                                                className="text-muted text-danger font-7">DNI / RUC
                                            </small>
                                        </div>
                                      
                                        <div className="pull-left m-left-sm ">
                                            <span><i className="fa fa-phone" aria-hidden="true"></i> {'978868159'}</span><br></br>
                                            <small
                                                className="text-muted text-danger font-7"> TELEFONOS
                                            </small>
                                        </div>

                                        <div className="btn-group hover-dropdown pull-right">
                                            <a href={'#'} onClick={modeEdit} className="btn btn-xs btn-default" type="button">
                                                <i className="fa fa-edit fa-lg"></i> </a>

                                            <a  className="btn btn-xs btn-default" type="button"><i
                                                className="fa fa-trash-o fa-lg"></i></a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="seperator"></div>

                        </div>


                    </li>

                </div>)
            }



        </>
    );
};

export default Propietario;