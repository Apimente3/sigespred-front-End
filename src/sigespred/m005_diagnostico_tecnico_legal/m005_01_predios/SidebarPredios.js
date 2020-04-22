import React from 'react';
import {Link} from "react-router-dom";

const SidebarPredios = ({codigopredio}) => {
    
    return (
        <div>
            <aside className="fixed skin-1">
                <div className="sidebar-inner scrollable-sidebar">

                    <div className="user-block clearfix">
                        <div className="detail">
                         <span  className="text-info">Predio:</span>    <b style={{color:'#000'}}> {codigopredio}</b>
                         
                        </div>
                        <div className="detail">
              
                            <strong className="text-red"> MENU DEL PREDIO</strong>
                        </div>
                    </div>
                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/datos-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/informe.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                       DATOS GENERALES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                         <li>
                             <Link to={`/ubicacion-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/ubicacionpredio.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        UBICACIÓN
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>



                            <li>
                                <Link to={`/polygono-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/polygonopredio.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        POLYGONO
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            <li menu="/brigadas-list">
                                <Link to={`/propietarios-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/propietariopredio.svg" className="btn-siderbar" ></img>
                    </span>
                                    <span className="text text-red">
                     SUJETO PASIVO
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                        

                            <li menu="/brigadas-list">
                                <Link to={`/posesionarios-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/posesionariopredio.svg" className="btn-siderbar" ></img>
                    </span>
                                    <span className="text text-red">
                     CARGAS Y GRAVAMENES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            <li menu="/brigadas-list">
                                <Link to={`/archivos-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/filespredio.svg" className="btn-siderbar" ></img>
                    </span>
                                    <span className="text text-red">
                    ADJUNTOS
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            <li menu="/brigadas-list">
                                <Link to={`/posesionarios-predio/${codigopredio}`}>
                            <span className="menu-icon">
                        <img src="/img/expedientepredio.svg" className="btn-siderbar" ></img>
                    </span>
                                    <span className="text text-red">
                     EXPEDIENTES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>
                </div>
            </aside>


        </div>
    );
};

export default SidebarPredios;