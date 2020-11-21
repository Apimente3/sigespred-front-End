import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';

const PredioLinks = ({active = 1}) => {
    const idPredio = useSelector(state => state.variable.predioid);
    console.log(typeof active);
    return (
        <>
            <div className="panel-tab clearfix">
                {/* {idPredio ? idPredio : ""} */}
                <ul class="tab-bar">
                    <li className={active === 1 ? "active": ""}>
                        <a href="#home1" data-toggle="tab"><i class="fa fa-home"></i> Datos Generales</a>
                    </li>
                    <li className={active === 2 ? "active": ""}>
                        <a href="#profile1" data-toggle="tab"><i class="fa fa-map-o"></i> Datos Técnicos</a>
                    </li>
                    <li className={active === 3 ? "active": ""}>
                        <a href="#message1" data-toggle="tab"><i class="fa fa-map-pin"></i> Datos Registrales</a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PredioLinks;