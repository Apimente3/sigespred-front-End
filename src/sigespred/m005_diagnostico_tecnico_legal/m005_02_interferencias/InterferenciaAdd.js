import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UploadFile from "../../../components/helpers/uploaders/Upload";
import Header from "../../m000_common/headers/Header";

const InterferenciaAdd = () => {

    const [interferencia, set_interferencia] = useState([]);

    function handleInputChange(e) {
        set_interferencia({
            ...interferencia,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }
    return (
        <>
            <Header></Header>

            <div className="container mtop-20">
                <form>
                    <fieldset className={'fielsettext'}>
                        <legend align="mtop-25 center fielsettext ">
                            <label className={'titleform'}>REGISTRAR INTERFERENCIA</label>
                        </legend>
                    </fieldset>
                </form>


                <div className="panel panel-default">
                    <div className="form-horizontal no-margin form-border" id="formWizard1" noValidate="">

                        <div className="panel-tab">
                            <ul className="tab-bar wizard-demo" id="wizardDemo1">
                                <li className="active">
                                  
                                </li>
                             

                            </ul>
                        </div>
                        <form >
                            <div className="panel-body">

                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="wizardContent1">

                                        <div>

                                            <i> <span>Los campos marcados con <span
                                                className="obligatorio">* </span> son requeridos.</span></i>
                                         
                                            <div style={{height: '20px'}}></div>







                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Codigo :</label>
                                                <div className="col-lg-10">
                                                    <input required type="text" className="form-control input-sm"
                                                           placeholder="Ingrese el codigo de la Interferencia"
                                                           name="descripcion"
                                                           onChange={handleInputChange}
                                                           value={interferencia.descripcion}
                                                    >
                                                    </input>
                                                </div>

                                               
                                            </div>
                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Tipo Interferencia :</label>
                                                <div className="col-lg-10">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="tipo_infraestructura_id"
                                                        onChange={handleInputChange}
                                                        value={interferencia.tipo_infraestructura_id}
                                                    >

                                                        <option value="0">-- SELECCIONE --</option>
                                                       

                                                    </select>
                                                </div>


                                            </div>
                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Interferencia :</label>
                                                <div className="col-lg-10">
                                                    <input required type="text" className="form-control input-sm"
                                                           placeholder="Ingrese la denominacion de la Interferencia."
                                                           name="descripcion"
                                                           onChange={handleInputChange}
                                                           value={interferencia.descripcion}
                                                    >
                                                    </input>
                                                </div>


                                            </div>
                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Empresa Prestadora Servicio :</label>
                                                <div className="col-lg-10">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="tipo_infraestructura_id"
                                                        onChange={handleInputChange}
                                                        value={interferencia.tipo_infraestructura_id}
                                                    >

                                                        <option value="0">-- SELECCIONE --</option>


                                                    </select>
                                                </div>


                                            </div>
                                            <div className="form-group ">
                                                <label className="col-lg-2 control-label"><span
                                                    className="obligatorio">* </span> Prioridad :</label>
                                                <div className="col-lg-10">
                                                    <select
                                                        required
                                                        className="form-control input-sm"
                                                        name="tipo_infraestructura_id"
                                                        onChange={handleInputChange}
                                                        value={interferencia.tipo_infraestructura_id}
                                                    >

                                                        <option value="0">-- SELECCIONE --</option>
                                                        <option value="BAJA">BAJA</option>
                                                        <option value="MEDIA">MEDIA</option>
                                                        <option value="ALTA">ALTA</option>


                                                    </select>
                                                </div>


                                            </div>

                                         
                                          

                                          


                                           


                                        </div>

                                    </div>
                           

                                </div>

                            </div>
                            <div className="panel-footer clearfix">
                                <div className="pull-left">
                                    <button type="submit" className="btn btn-danger btn-sm  btn-control"
                                    > Guardar
                                    </button>
                                    <Link to={'/list-proyectos'}  className="btn btn-sm btn-default btn-control" id="nextStep1">

                                        Cancelar
                                    </Link>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>


            </div>
            <div className="row margin-button-form "></div>
            
        </>
    );
};

export default InterferenciaAdd;