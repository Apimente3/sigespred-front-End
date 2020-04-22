import React, {Component} from 'react';

class VisorPdf extends Component {

    closeModal=(e)=>{
        e.preventDefault();
        this.props.closeOficio()
    }
    render() {
        return (
            <div>

                <div id="lightCustomModal_background" className="popup_background backblq"
                ></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div className="custom-popup light  popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a href="#" onClick={this.closeModal} className="btn btn-default m-right-sm lightCustomModal_close pull-right">X</a>
                        <div className="padding-md ">
                          
                            <object className="visorPDF" data="/docs/2.PDF" type="application/pdf">
                                <embed src="/docs/2.PDF" type="application/pdf" />
                            </object>
                        </div>

                       
                    </div>
                    <div className="popup_align bloqueador3" >
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default VisorPdf;