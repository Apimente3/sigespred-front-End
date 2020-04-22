import React, {Component} from 'react';

class InputApn extends Component {
    render() {
        return (
            <div className="form-group">
                <label className="col-lg-2 control-label"><span className="obligatorio">* </span> Informe APN</label>
                <div className="col-lg-4">
                    <input required="" className="form-control input-sm" type="text" placeholder=""
                           value=""></input>
                </div>

                <div className="col-lg-4">
                    <input required="" className="" type="file" placeholder="" value=""></input>
                </div>

                <div className="col-lg-2">
                    <a target="_blank" href="/docs/2.PDF" className="btn btn-default"><i
                        className="fa fa-eye"></i> Ver </a>
                </div>
            </div>
        );
    }
}

export default InputApn;