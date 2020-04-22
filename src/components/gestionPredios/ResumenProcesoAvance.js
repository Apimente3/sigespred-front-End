import React, {Component} from 'react';

class ResumenProcesoAvance extends Component {
    render() {
        return (
            <div>
             
                <div className="form-group">
                    <label className="col-lg-2 control-label"> AVANCE DEL PROCESO</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>05/08/2019</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc">Fecha Inicio Proceso Actual</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>6</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc">Dias Transcurridos Proceso Actual</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>3</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc">Dias Restantes Proceso Actual</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>09/08/2019</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc">Fecha Finalizacion Proceso Actual</small>
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"> </label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>05/08/2019</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_gene">Fecha Inicio Proceso General</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>6</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_gene">Dias Transcurridos Proceso General</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>24</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_gene">Dias Restantes Proceso General</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>05/09/2019</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_gene">Fecha Fin Proceso General</small>
                        </div>
                    </div>

                </div>
              
            </div>
        );
    }
}

export default ResumenProcesoAvance;