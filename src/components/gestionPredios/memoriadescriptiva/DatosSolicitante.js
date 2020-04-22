import React, {useState, useEffect, useRef} from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Header from "../../header/Header";
import SiderBarMemoriaDescriptiva from "./SiderBarMemoriaDescriptiva";

const DatosSolicitante = ({history, match}) => {

    const {codpred} = match.params;
    
    return (
       

            <>
                <Header></Header>
                <SiderBarMemoriaDescriptiva predio={codpred}/>
                <form>
                    <div className="container mtop-20">

                        <div className="panel panel-default form-horizontal no-margin form-border">

                            <div className="panel-body">
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext">2. DATOS DEL SOLICITANTE</legend>
                                </fieldset>

                                <div>


                                    <div className="form-group">
                                        <label className="col-lg-3 control-label"><span
                                            className="obligatorio">* </span> ENTIDAD</label>
                                        <div className="col-lg-6">
                                            <input required className="form-control input-sm" type="text"></input>
                                        </div>


                                    </div>

                                    <div className="panel-body">
                                        <div className="form-group ">
                                            <div className="col-lg-offset-7 col-lg-12">
                                                <button id="btnguardar" type="button"
                                                        className="btn btn-danger btn-sm btn-control">

                                                    Guardar
                                                </button>


                                            </div>

                                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </>
          
       
    );
};

export default 
DatosSolicitante;