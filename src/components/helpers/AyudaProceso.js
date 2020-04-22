import React from 'react';

const AyudaProceso = ({descripcion}) => {
    return (
        <>
            <span className="" data-toggle="tooltip"
                  data-original-title={descripcion}>
											<i className="fa fa-info-circle" aria-hidden="true"></i> 
										</span>
        </>
    );
};

export default AyudaProceso;