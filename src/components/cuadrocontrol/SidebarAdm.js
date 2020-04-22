import React, {Component} from 'react';
import './stylesAdm.css'

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


                                <li menu="proyectos">
                                    <a href="proyecto-list">
                            <span className="menu-icon">
                        <img src="img/proyectos.svg" className="btn-siderbar" ></img>
                    </span>
                                        <span className="text text-red">
                        Concesiones
                    </span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li menu="proyectos">
                                    <a href="list-proyectos">
                            <span className="menu-icon">
                        <img src="img/proyectos.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                        Proyectos
                    </span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>

                                <li menu="proyectos">
                                    <a href="proyecto-list">
                            <span className="menu-icon">
                        <img src="img/proyectos.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                        Obras
                    </span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>

                                <li>
                                    <a href="/list-trabajadores">
                            <span className="menu-icon">
                        <img src="img/tipoproyecto.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                        Brigadistas
                    </span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>

                                <li menu="/list-trabajadores">
                                    <a href="brigada-list">
                            <span className="menu-icon">
                        <img src="img/brigadas.svg" className="btn-siderbar" ></img>
                    </span>
                                        <span className="text text-red">
                        Brigadas 
                    </span>
                                        <span className="menu-hover"></span>
                                    </a>
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