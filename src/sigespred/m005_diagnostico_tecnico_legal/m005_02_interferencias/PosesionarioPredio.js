import React from 'react';
import Header from "../../header/Header";
import SidebarPredios from "./SidebarPredios";

const PosesionarioPredio= ({match}) => {
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
                                <legend align="center fielsettext">POSESIONARIOS DEL PREDIO</legend>
                            </fieldset>

                            <div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>  INICIO</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> FINAL</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> LADO</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>


                                <hr></hr>
                                <div className="form-group">

                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> TIPO</label>
                                    <div className="col-lg-10">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> ZONIFICACION</label>
                                    <div className="col-lg-10">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> USO ACTUAL</label>
                                    <div className="col-lg-10">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>

                                </div>


                                <h7>UBICACIÓN</h7>
                                <hr></hr>



                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> UNIDAD CATASTRAL</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> DENOMINACION</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>SECTOR</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> DEPARTAMENTO</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> PROVINCIA</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>DISTRITO</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> REFERENCIA</label>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>



                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> VIA </label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span>MANZ. </label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span>LOTE </label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"></input>
                                    </div>
                                </div>
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


export default PosesionarioPredio;