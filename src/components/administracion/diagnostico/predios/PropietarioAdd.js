import React, {useState} from 'react';
import FileBase64 from "react-file-base64";

const PropietarioAdd = () => {

    const [addtramo, setAddtramo] = useState(false);
    const [foto, guardarFoto] = useState('/img/userblank.jpg');


    const Agregar=(e)=>{
        e.preventDefault()
        setAddtramo(true)
    }

    const Cancel=(e)=>{
        e.preventDefault()
        setAddtramo(false)
    }

    const getFiles = (files) => {
        console.log(files)
        //guardarFoto(files[0].base64)
    }




    return (
        <>
    
            <div className="form-group ">
                <div className="col-lg-offset-0 col-lg-12">
                    <button onClick={Agregar} type="button"
                            className="btn btn-default btn-sm btn-control pull-right">+ Agregar
                    </button>


                </div>

            </div>

            { addtramo ? (
                <div className="panel-body addTramo">
                    <fieldset className={'fielsettext'}>
                        <legend align="center fielsettext">Registrar Propietario</legend>
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
                      

                        <hr/>
                        <div className="panel-body">
                            <div className="form-group ">
                                <div className="col-lg-offset-8 col-lg-10">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={Cancel}
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>

                                </div>

                            </div>

                        </div>


                    </form>
                </div>
            ):''}

          
        </>
    );
};

export default PropietarioAdd;