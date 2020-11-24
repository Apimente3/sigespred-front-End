import React, { useEffect }  from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
const {$} = window;

const PredioLinks = ({active = "1"}) => {
    const dataPredio = useSelector(state => state.variable.predio);

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <div className="border-abajo clearfix">
                <ul className="tab-bar">
                    <li className={active === "1" ? "active": ""}>
                        <Link  to={`/predio-gen-edit/${dataPredio.predioid}/${dataPredio.codigopredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Generales" }><i
                            className="fa fa-home"></i> Datos Generales</Link>
                    </li>
                    <li className={active === "2" ? "active": ""}>
                        <Link  to={`/predio-tec-edit/${dataPredio.predioid}/${dataPredio.codigopredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Técnicos" }><i
                            className="fa fa-map-o"></i> Datos Técnicos</Link>
                    </li>
                    <li className={active === "3" ? "active": ""}>
                        <Link  to={`/predio-reg-edit/${dataPredio.predioid}/${dataPredio.codigopredio}`}  className="btn btn-xs btn-default mright-5" type="button" data-toggle="tooltip" data-original-title={ "Editar Datos Registrales" }><i
                            className="fa fa-map-pin"></i> Datos Registrales</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PredioLinks;