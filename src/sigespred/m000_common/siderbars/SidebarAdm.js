import React, {Component} from 'react';
import {Link} from "react-router-dom";


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




                                <li>
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
                          

                              
                                
                                

                             

                                <li menu="/brigadas-list">
                                    <Link to={"/brigada-list"}>
                            <span className="menu-icon">
                        <img src="/img/brigadas.svg" className="btn-siderbar" ></img>
                    </span>
                                        <span className="text text-red">
                        EQUIPOS DE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp; &nbsp;
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
                        INDICADORES DE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            GESTIÓN
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