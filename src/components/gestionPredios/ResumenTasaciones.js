import React, {Component} from 'react';

class ResumenTasaciones extends Component {
    render() {
        return (
            <div>

                <div className="form-group">
                    <label className="col-lg-2 control-label">DATOS GENERALES</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 ">VALOR DE TERRENO</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 ">VALOR DE EDIFICACIONES</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 ">VALOR DE LAS PLANTACIONES</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 ">LUCRO CESANTE</small>
                        </div>
                    </div>
        
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 ">DAÑO EMERGENTE</small>
                        </div>
                    </div>
                    <label className="col-lg-2 control-label">TOTAL</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 "><b>TOTAL SIN INCENTIVO</b> </small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 "><b>20 % INCENTIVO</b></small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>S/. 45,022.55</span><br></br>
                            <small className="text-muted text-danger font-7 "><b>TOTAL + INCENTIVO</b></small>
                        </div>
                    </div>
              
                 
                </div>





            </div>
        );
    }
}

export default ResumenTasaciones;