import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getToken} from "../../../utils";
import {initAxiosInterceptors, logout} from '../../../config/axios';
import {serverFile} from '../../../config/axios';
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
        logout();
        window.location = '/';
    }


    return (
        <>
            {loading ? (<li className="profile dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">

                    <i className="fa fa-refresh fa-spin" aria-hidden="true"></i>
                </a></li>) : (
                <li className="profile dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">

                        {
                            !usuario.foto  ? <h3>Ingrese la Foto</h3> :<img src={serverFile+ usuario.foto.path} className="img-circle fototrabajadorheader" alt="User Avatar"></img>

                        }

                        <span>{` ${usuario.nombres} ${usuario.nombres}`} </span>
                        <span><i className="fa fa-chevron-down"></i></span>
                    </a>
                    <ul className="dropdown-menu">

                        <li><Link tabIndex="-1" to={`/configuracion-usuario`} className="main-link"><i className="fa fa-cogs"
                                                                                             aria-hidden="true"></i> Configuración</Link>
                        </li>

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