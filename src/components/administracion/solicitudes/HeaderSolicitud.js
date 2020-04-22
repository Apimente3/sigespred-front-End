import React from 'react';
import {Link} from "react-router-dom";

const HeaderSolicitud = () => {
    return (
        <div>
            <li className="list-group-item clearfix trabajdorlist">
                <div className="padding-trabajador">
                    <div className="clearfix ">


                        <div>
                          
                            <div className="col-md-12">

                                <div className="form-group">
                                    <label className="col-lg-3 control-label">
                                      CODIGO
                                    </label>
                                    <label className="col-lg-3 control-label"> 
                                       DOCUMENTO
                                    </label>



                                    <label className="col-lg-3 control-label">
                                       EMPR0 CONCESIONARIA
                                    </label>
                                    <label className="col-lg-3 control-label">
                                        MEMORANDO 00212<br></br>2019-08-17 12:45
                                    </label>
                                    



                                </div>

                              

                            </div>
                        </div>

                    </div>
                    <div className="seperator"></div>

                </div>


            </li>
        </div>
    );
};

export default HeaderSolicitud;