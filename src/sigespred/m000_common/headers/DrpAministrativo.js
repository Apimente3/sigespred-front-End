import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getToken} from "../../../utils";
import {initAxiosInterceptors, logout} from '../../../config/axios';

const axios = initAxiosInterceptors();


const DrpAministrativo = ({history}) => {

    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState({}); // Estado del Usuario

    useEffect(() => {
        async function cargarUsuario() {
            let token = getToken()
            if (!token) {
                console.log('No inicio session')
            }

            try {
                const {data: trabajador} = await axios.post('/quiensoy', {token: token});
                console.log(trabajador)
                if (!trabajador) {
                    history.push('/login');
                }
                setLoading(false)
                setUsuario(trabajador)
            } catch (error) {
                window.location = '/'
            }
        }

        cargarUsuario();
    }, []);

    /*Funcion para cerrar session*/

    const cerrarSession = () => {
        logout()

    }


    return (
        <>
            {loading ? (<li className="profile dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">

                    <i className="fa fa-refresh fa-spin" aria-hidden="true"></i>
                </a></li>) : (
                <li className="profile dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">

                        <img src={usuario.foto} className="img-circle fototrabajadorheader"
                             alt="User Avatar"></img>

                        <span>{` ${usuario.nombres} ${usuario.nombres}`} </span>
                        <span><i className="fa fa-chevron-down"></i></span>
                    </a>
                    <ul className="dropdown-menu">

                        {
                            (usuario.rol == 1 || usuario.rol == 2) ? (<>
                                    <li><Link tabIndex="-1" to={`/solicitudes`} className="main-link">Administrador</Link>
                                    </li>
                                </>)
                                : null
                        }


                        <li className="divider"></li>
                        <li><a onClick={cerrarSession} tabIndex="-1" className="main-link logoutConfirm_open"
                               href="#logoutConfirm"><i className="fa fa-sign-out"
                                                        aria-hidden="true"></i> Salir</a></li>
                    </ul>
                </li>)}
        </>
    );
};

export default DrpAministrativo;