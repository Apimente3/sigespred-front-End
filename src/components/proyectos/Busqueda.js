import React, {Component} from 'react';

class Busqueda extends Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control "
                               placeholder="Codigo de Predio / Nro Expediente"></input>
                        <span className="input-group-btn">
												<button className="btn btn-default " type="button"><i
                                                    className="fa fa-search"></i></button>
											</span>
                    </div>

                </div>
            </form>
        );
    }
}

export default Busqueda;