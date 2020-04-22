import React, {Component} from 'react';

class ResumenPredio extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"> DATOS PREDIO</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>323211001</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Partida Registral</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span><b>ADQUISICION</b></span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado"><b>Tipo de Proceso</b></small>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="pull-left m-left-sm ">
                            <span>Josefina Quispe Toledo , Juan Mendoza Arevalo</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Afectados - <b>SOCIENDAD CONYUGAL</b></small>
                        </div>
                    </div>

                   

                </div>

            </div>
        );
    }
}

export default ResumenPredio;