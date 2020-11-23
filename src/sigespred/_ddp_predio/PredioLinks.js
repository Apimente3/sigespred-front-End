import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
const {$} = window;

const PredioLinks = ({active = "1"}) => {
    const idPredio = useSelector(state => state.variable.predioid);

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <div className="panel-tab clearfix">
                <ul class="tab-bar">
                    <li className={active === "1" ? "active": ""}>
                        <Link  to={`/predio-gen-edit/${idPredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Generales" }><i
                            className="fa fa-home"></i> Datos Generales</Link>
                    </li>
                    <li className={active === "2" ? "active": ""}>
                        <Link  to={`/predio-tec-edit/${idPredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Técnicos" }><i
                            className="fa fa-map-o"></i> Datos Técnicos</Link>

                    </li>
                    <li className={active === "3" ? "active": ""}>
                        <Link  to={`/predio-reg-edit/${idPredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Registrales" }><i
                            className="fa fa-map-pin"></i> Datos Registrales</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PredioLinks;