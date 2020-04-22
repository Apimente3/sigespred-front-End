import React, {Component} from 'react';

class BloqueadorProceso extends Component {
    render() {
        return (
            <div>

                <div id="lightCustomModal_background" className="popup_background backblq"
                    ></div>
            <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                <div className="custom-popup light width-100 popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                     data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"
                   
                     tabIndex="-1">
                    <div className="padding-md">
                        <h4 className="m-top-none"> No tiene Acceso a este PROCESO</h4>
                    </div>

                    <div className="text-center">
                        <a href="#" className="btn btn-success m-right-sm lightCustomModal_close">Ir a Proceso anterior</a>
                     
                    </div>
                </div>
                <div className="popup_align bloqueador3" ></div>
            </div>
    </div>
        );
    }
}

export default BloqueadorProceso;