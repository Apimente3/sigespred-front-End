import React, {Component} from 'react';
const {jQuery} = window;
class AyudaCampo extends Component {

    componentDidMount() {
        jQuery('[data-toggle="tooltip"]').tooltip()
    }

    render() {
        const {descripcion}=this.props;
        return (
            <>
                <span className="post-like text-muted tooltip-test" data-toggle="tooltip"
                      data-original-title={descripcion}>
										<i className="fa fa-question-circle-o" aria-hidden="true"></i>
										</span>
            </>
        );
    }
}

export default AyudaCampo;