import React from 'react';
import Header from "../../header/Header";
import SelectProcessos from "../SelectProcessos";
import ResumenProcesoDatos from "../ResumenProcesoDatos";
import ResumenPredio from "../ResumenPredio";
import BrigadaProcess from "../BrigadaProcess";
import ResumenProcesoAvance from "../ResumenProcesoAvance";
import FooterProcess from "../FooterProcess";

import SiderBarMemoriaDescriptiva from "./SiderBarMemoriaDescriptiva";

const MemoriaDescriptiva = ({history}) => {
    return (
        <div>


            <Header></Header>
            <SiderBarMemoriaDescriptiva/>

            <form action="">
                <div className="container mtop-20">
                    <h4 className=" ">

                    </h4>

                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5>MEMORIA DESCRIPTIVA</h5>
                                </div>

                            </div>


                        </div>
                        <div className="panel-body">

                            <div className={'borderreumenes'}>
                                <ResumenProcesoDatos/>

                            </div>

                            <hr></hr>

                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button id="btnguardar" type="button"
                                                className="btn btn-danger btn-sm btn-control">

                                            Finalizar
                                        </button>


                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </form>
            <div className="h-list-pred-footer"></div>


            <FooterProcess/>
        </div>
    );
};

export default MemoriaDescriptiva;