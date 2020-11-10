import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SidebarAdm extends Component {
    render() {
        return (
            <div>
                <aside className="fixed skin-1">
                    <div className="sidebar-inner scrollable-sidebar">
                        <div className="user-block clearfix">
                            <div className="detail">
                                <strong className="text-red"> MENU DE ADMINISTRACIÓN</strong>
                            </div>
                        </div>
                        <div className="main-menu">
                            <ul>
                                {/* <li>
                                    <Link to={"/list-proyectos"}>
                                        <span className="menu-icon">
                                            <img src="/img/proyectos.svg" className="btn-siderbar"></img>
                                        </span>
                                        <span className="text text-red">
                                            PROYECTOS
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/list-equipos2">
                                    <Link to={"/list-equipos2"}>
                                        <span className="menu-icon">
                                            <img src="/img/brigadas.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            EQUIPOS DE <br/>
                                            TRABAJO
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/brigadas-list">
                                    <Link to={"/brigada-list"}>
                                        <span className="menu-icon">
                                            <img src="/img/presentacion.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            INDICADORES DE <br/>
                                            GESTIÓN
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li> */}

                                <li menu="/planos">
                                    <Link to={"/planos"}>
                                        <span className="menu-icon">
                                            <img src="/img/planos.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Planos
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                <li menu="/planos">
                                    <Link to={"/partidas"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Partidas Registrales
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/gestionpredial">
                                    <Link to={"/gestionpredial"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Gestion Predial
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/list-trabajadores">
                                    <Link to={"/list-trabajadores"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Trabajadores
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/indicadores">
                                    <Link to={"/indicadores"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Indicadores
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
}

export default SidebarAdm;