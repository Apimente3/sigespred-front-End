import React from 'react';
import {Link} from "react-router-dom";

const MCodigoPlanos = ({dataMostrar}) => {

    const downloadTxtFile = () => {
        if (dataMostrar) {
            const element = document.createElement("a");
            var text = "";
            dataMostrar.forEach(code => {
                  text += code + '\r\n';
            });
            
            const file = new Blob([text], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "codigosPlanos.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
      }
    
    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform: 'scale(1)', alignContent: 'left'}}
                         className="custom-popup light  popup_content popup_content_visible bloqueador2"
                         id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <Link to={`/planos`} className="btn  m-right-sm lightCustomModal_close pull-right"><i className="fa fa-times" aria-hidden="true"></i>
                        </Link>
                        <div className=" " style={{width: '500px'}}>
                            <div className="modal-header">
                                <h4>Listado de Códigos Generados</h4>
                            </div>
                            <form >
                                <div className="modal-body">
                                    <div className="mleft-20">
                                        {dataMostrar && dataMostrar.length > 0 &&  dataMostrar.map(function(item, i){
                                            return <li key={'licodplano_' + i}>{item}</li>
                                        })}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                <a onClick={downloadTxtFile} className="btn btn-default btn-sm dropdown-toggle pull-left">Download txt</a>
                                    <Link to={`/planos`} className="btn btn-default btn-sm btn-control">Cerrar
                                    </Link>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default MCodigoPlanos;