import React from 'react';
import './modal.css'

const ModalSearchCad = () => {
    return (
        <>


            <div id="popup1" className="overlay">
                <div className="popup">
                    <h4>Busqueda en Base de datos Geografica</h4>
                    <hr/>
                    <a className="close" href="#">&times;</a>
                   
                    <div className="form-group">
                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span>Capa</label>
                        <div className="col-lg-6">
                            <select id="tipopredio"  className="form-control input-sm"
                                  
                            >
                                <option value="0">-- SELECCIONE --</option>
                               

                            </select>
                        </div>

                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Codigo</label>
                        <div className="col-lg-6">
                            <input required="" className="form-control input-sm" type="text"
                                   placeholder="Ingrese codigo con el que se subio desde el AUTOCAD"
                                   value=""></input>
                        </div>


                        <div className="col-lg-1">

                        </div>
                    </div>

                    <div className="panel-body">
                        <div className="form-group ">
                            <div className="col-lg-offset-2 col-lg-10">
                                <button id="btnguardar" type="submit" className="btn btn-danger btn-sm btn-control">Buscar
                                </button>
                                <a href="#" className="btn btn-default btn-sm btn-control">Cancelar</a>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalSearchCad;