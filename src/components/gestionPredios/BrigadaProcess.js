import React, {Component} from 'react';

class BrigadaProcess extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="col-lg-2 control-label"> EQUIPO DE TRABAJO</label>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>BRIGADA 001</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Brigada</small>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>Armando Pimentel Abril</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Tecnico</small>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="pull-left m-left-sm ">
                            <span>Miguel Rodriguez Meneses</span><br></br>
                            <small className="text-muted text-danger font-7 text-fech_proc anaranjado">Legal</small>
                        </div>
                    </div>

                   

                </div>
              
            </div>
        );
    }
}

export default BrigadaProcess;