import React, {Component} from 'react';
const {jQuery} = window;
class AyudaProceso extends Component {

    componentDidMount() {
        jQuery('[data-toggle="tooltip"]').tooltip()
    }
    
    render() {
        const {descripcion}=this.props;
        return (
            <>
             <span className="" data-toggle="tooltip"
                   data-original-title={descripcion}>
											<i className="fa fa-info-circle" aria-hidden="true"></i> 
										</span>   
            </>
        );
    }
}

export default AyudaProceso;