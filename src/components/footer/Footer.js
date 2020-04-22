import React, {Component} from 'react';
import '../gestionPredios/proce_0/styles.css'

class Footer extends Component {
    render() {
        return (
         
                <footer className="footer-navbar-wrapper">
                    <div className="container">
                        <div className="row ">
                            <div className="col-sm-3 padding-md">
                                <p className="font-lg">SISTEMA DE GESTION DE PREDIOS - MTC</p>
                                <p>
                                    <small>Sistema de Gestion Predios, permite la gestion de los predios desde el inicio del proceso de adquisiscion hasta su finalizacion
                                    </small>
                                </p>
                            </div>
                       
                            <div className="col-sm-3 padding-md">
                                <p className="font-lg">MÁS USADOS</p>
                                <ul className="list-unstyled useful-link">
                                    <li>
                                        <a href="#">
                                            <small><i className="fa fa-chevron-right"></i> Manual de Usuario</small>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <small><i className="fa fa-chevron-right"></i> Videotutoriales</small>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <small><i className="fa fa-chevron-right"></i> Base Legal</small>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-sm-3 padding-md">
                              
                            </div>
                          
                            <div className="col-sm-3 padding-md">
                                <p className="font-lg">CONTACTENOS</p>
                                <p> Email : predios_gestion@mtc,gob.pe</p>
                                <div className="seperator"></div>
                                <a className="btn btn-danger btn-sm"><i className="fa fa-envelope"></i> Contacto de Soporte</a>
                            </div>
                      
                        </div>
                    </div>
                   
                </footer>
      
        );
    }
}

export default Footer;