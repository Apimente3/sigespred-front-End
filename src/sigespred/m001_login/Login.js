//region Importaciones de Librerias
import '../../styles/login.css'
import React, {useState, useEffect} from 'react';
import HeaderLogin from './HeaderLogin';
import ErrorMessage from './ErrorMessage';
import { useHistory } from "react-router-dom"

/*Importando los Axios configurado*/
import {initAxiosInterceptors,} from '../../config/axios';
import {login as LoginSession, getToken} from '../../utils';
import Boton from "../../components/helpers/Boton";
//endregion

const axios = initAxiosInterceptors();

const Login = ({}) => {

    let history = useHistory();

    const [auhtError, setAuhtError] = useState(false); // no sabemos si hay un usuario autenticado
    const [error, setError] = useState(null); // no sabemos si hay un usuario autenticado
    const [procesando, setProcesando] = useState(false); // no sabemos si hay un usuario autenticado
    const [emailYPassword, setEmailYPassword] = useState({
        dni: '',
        password: ''
    });

    /**/


    useEffect(() => {
        async function cargarUsuario() {
            let token = getToken()
            if (!token) {
                console.log('No inicio session')
            }
            try {
                const trabajador = await axios.post('/quiensoy', {token: token});
                if (trabajador) {
                    history.push('/list-proyectos');
                }
            } catch (error) {
                console.log(error);
            }
        }
        cargarUsuario();
    }, []);


    async function login(dni, contrasenia) {
        try {
            const {data} = await axios.post('/login', {
                dni,
               contrasenia: password
            });
            if (LoginSession(data)) {
                history.push('/gestionpredials');
                setAuhtError(false)
            }else{
            }
        }
        catch (e) {
            console.log(e.response)
            setAuhtError(true)
            setError(e.response.data);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setProcesando(true);
            await login(emailYPassword.dni, emailYPassword.password);
            setProcesando(false);
        } catch (error) {
            setAuhtError(true);
        }
    }


    /*Funcion de lectura de inputs*/
    function handleInputChange(e) {
        setEmailYPassword({
            ...emailYPassword,
            [e.target.name]: e.target.value
        });
    }

    const esconderError = () => {
        setAuhtError(false)
    }


    return (
        <div className="login-wrapper bg">
            <HeaderLogin></HeaderLogin>
            <div className="login-widget animation-delay1 wlogin">
                <div className="panel panel-default panel-login">
                    <div className="panel-heading clearfix panel-login">
                        <center>
                            <div className="pull-left login-title">
                                <i className="fa fa-lock fa-lg"></i> Login
                            </div>
                        </center>
                    </div>
                    <div className="panel-body">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="login-label">DNI</label>
                                <input name="dni" required type="number" placeholder="DNI" maxlength="8"
                                       className="form-control input-sm bounceIn animation-delay2 input-login-user"
                                       onChange={handleInputChange}
                                       value={emailYPassword.email}
                                       title="Ingrese un DNI de 8 Digitos"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label className="login-label">Contraseña</label>
                                <input name="password" required type="password" placeholder="Contraseña"
                                       className="form-control input-sm bounceIn animation-delay4 input-login"
                                       onChange={handleInputChange}
                                       value={emailYPassword.email}
                                ></input>
                            </div>
                            <hr/>
                            <Boton textButton={'Ingresar'} procesando={procesando}/>

                            <br></br>
                            <br></br>
                            {auhtError ?
                                (<ErrorMessage mensaje={error} esconderError={esconderError}/>)
                                : ''}

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;