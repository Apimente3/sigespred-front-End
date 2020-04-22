import React from 'react';

const Breadcrumd = () => {
    return (
        <>
            <ul className="wizard-steps wizard-demo" id="wizardDemo1">
                <li className="active">
                    <a href="#wizardContent1" data-toggle="tab">Listado de Proyectos</a>
                </li>

                <li className="active">
                    <a href="#wizardContent1" data-toggle="tab">Proyecto</a>
                </li>
                <li className="active">
                    <a href="#wizardContent1" data-toggle="tab">Predio</a>
                </li>
                <li className="active">
                    <a href="#wizardContent1" data-toggle="tab">Expediente</a>
                </li>
               
            </ul>
        </>
    );
};

export default Breadcrumd;