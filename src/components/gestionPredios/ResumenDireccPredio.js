import React, {Component} from 'react';

class ResumenDireccPredio extends Component {
    render() {
        return (
            <div>
                <hr></hr>
                <div className="form-group">
                    <label className="col-lg-2 control-label">Ubicacion del Predio</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>TUMBES</span><br></br>
                            <small className="text-muted text-danger font-7 ">DEPARTAMENTO</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>TUMBES</span><br></br>
                            <small className="text-muted text-danger font-7">PROYECTO</small> -
                            <small className="text-muted text-danger font-7"> PROVINCIA</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>TUMBES</span><br></br>
                            <small className="text-muted text-danger font-7 ">DISTRITO</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span> - </span><br></br>
                            <small className="text-muted text-danger font-7">DIRECCION</small>
                        </div>
                    </div>

                   

                </div>


                <hr></hr>


            </div>
        );
    }
}

export default ResumenDireccPredio;