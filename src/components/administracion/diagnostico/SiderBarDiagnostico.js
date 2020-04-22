import React, {Component} from 'react';
import {Link} from "react-router-dom";


const SidebarAdm =({proyecto})=> {

     
        return (
            <div>
                <aside className="fixed skin-1">
                    <div className="sidebar-inner scrollable-sidebar">
                        <div className="user-block clearfix">
                            <div className="detail">
                                <strong  className="text-red"><b style={{color:'#000'}}>{proyecto}</b></strong>
                            </div>
                        </div>
                        <div className="user-block clearfix">
                            <div className="detail">
                                <strong className="text-red"> MENU DE GESTION PREDIAL</strong>
                            </div>
                        </div>
                        <div className="main-menu">
                            <ul>

                                <li>
                                    <Link to={`/proyecto/datosgenerales/${proyecto}`}>
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
                                    <Link to={`/proyecto/datosgenerales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/informe.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                       SOLICITUDES DE GESTION PREDIAL VINCULADAS
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/proyecto/informacion-cartografica/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/map.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                    INFORMACION   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CARTOGRAFICA BASE
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/proyecto/diagnostico/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/diagnostico2.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                    DIAGNOSTICO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TECNICO LEGAL
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                            

                                <li menu="/brigadas-list">
                                    <Link to={`/predios-list/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/predios2.svg" className="btn-siderbar" ></img>
                    </span>
                                        <span className="text text-red">
                        PREDIOS 
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/brigadas-list">
                                    <Link to={`/proyecto/interferencia-lit/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/interferencia.svg" className="btn-siderbar" ></img>
                    </span>
                                        <span className="text text-red">
                        INTERFERENCIAS 
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

}

export default SidebarAdm;