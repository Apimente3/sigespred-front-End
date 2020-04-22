import React from 'react';
import Header from "../../header/Header";
import SidebarPredios from "./SidebarPredios";
import PolygonPredio from "./PolygonPredio";

const PolygonoPredio = ({match}) => {
    const {codigo} = match.params;
    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <form>
                <div className="container mtop-20">

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext">POLIGONO DEL PREDIO</legend>
                            </fieldset>

                            <div>
                          

                             
                             
                             <PolygonPredio/>
                                <div className="panel-body">
                                    <div className="form-group ">
                                        <div className="col-lg-offset-10 col-lg-12">
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
        </div>
    );
};


export default PolygonoPredio;