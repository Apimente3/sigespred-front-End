import React, { Component } from 'react';
import { Link } from "react-router-dom";
const {$}=window;

class SidebarAdm extends Component {

    componentDidMount() {

        $('#sizeToggle').click(function()	{

            $('#wrapper').off("resize");

            $('#wrapper').toggleClass('sidebar-mini');
            $('.main-menu').find('.openable').removeClass('open');
            $('.main-menu').find('.submenu').removeAttr('style');
        });
    }

    render() {
        return (
            <>
                <aside className="skin-1">

                    <div className="sidebar-inner scrollable-sidebars">
                        <div className="size-toggle">
                            <a className="btn btn-sm" id="sizeToggle">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </a>
                            <a className="btn btn-sm pull-right logoutConfirm_open" href="#logoutConfirm">
                                <i className="fa fa-power-off"></i>
                            </a>
                        </div>

                        <div className="search-block">
                            <div className="input-group">
                                <input type="text" className="form-control input-sm" placeholder="search here..."/>
						<span className="input-group-btn">
							<button className="btn btn-default btn-sm" type="button"><i
                                className="fa fa-search"></i></button>
						</span>
                            </div>
                        </div>
                        <div className="main-menu">
                            <ul>
                                <li>
                                    <a href="index.html">
								<span className="menu-icon">
									<i className="fa fa-desktop fa-lg"></i>
								</span>
                                        <span className="text">
									Dashboard
								</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li className="active openable open">
                                    <a href="#">
								<span className="menu-icon">
									<i className="fa fa-file-text fa-lg"></i>
								</span>
                                        <span className="text">
									Page
								</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                    <ul className="submenu">
                                        <li><a href="login.html"><span className="submenu-label">Sign in</span></a></li>
                                        <li><a href="register.html"><span className="submenu-label">Sign up</span></a>
                                        </li>
                                        <li><a href="lock_screen.html"><span
                                            className="submenu-label">Lock Screen</span></a></li>
                                        <li><a href="profile.html"><span className="submenu-label">Profile</span></a>
                                        </li>
                                        <li><a href="blog.html"><span className="submenu-label">Blog</span></a></li>
                                        <li><a href="single_post.html"><span
                                            className="submenu-label">Single Post</span></a></li>
                                        <li><a href="landing.html"><span className="submenu-label">Landing</span></a>
                                        </li>
                                        <li><a href="search_result.html"><span
                                            className="submenu-label">Search Result</span></a></li>
                                        <li><a href="chat.html"><span className="submenu-label">Chat Room</span></a>
                                        </li>
                                        <li><a href="movie.html"><span
                                            className="submenu-label">Movie Gallery</span></a></li>
                                        <li><a href="pricing.html"><span className="submenu-label">Pricing</span></a>
                                        </li>
                                        <li><a href="invoice.html"><span className="submenu-label">Invoice</span></a>
                                        </li>
                                        <li><a href="faq.html"><span className="submenu-label">FAQ</span></a></li>
                                        <li><a href="contact.html"><span className="submenu-label">Contact</span></a>
                                        </li>
                                        <li><a href="error404.html"><span className="submenu-label">Error404</span></a>
                                        </li>
                                        <li><a href="error500.html"><span className="submenu-label">Error500</span></a>
                                        </li>
                                        <li className="active"><a href="blank.html"><span
                                            className="submenu-label">Blank</span></a></li>
                                    </ul>
                                </li>
                                <li className="openable">
                                    <a href="#">
								<span className="menu-icon">
									<i className="fa fa-tag fa-lg"></i>
								</span>
                                        <span className="text">
									Component
								</span>
                                        <span className="badge badge-success bounceIn animation-delay5">9</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                    <ul className="submenu">
                                        <li><a href="ui_element.html"><span className="submenu-label">UI Features</span></a>
                                        </li>
                                        <li><a href="button.html"><span className="submenu-label">Button & Icons</span></a>
                                        </li>
                                        <li><a href="tab.html"><span className="submenu-label">Tab</span></a></li>
                                        <li><a href="nestable_list.html"><span
                                            className="submenu-label">Nestable List</span></a></li>
                                        <li><a href="calendar.html"><span className="submenu-label">Calendar</span></a>
                                        </li>
                                        <li><a href="table.html"><span className="submenu-label">Table</span></a></li>
                                        <li><a href="widget.html"><span className="submenu-label">Widget</span></a></li>
                                        <li><a href="form_element.html"><span
                                            className="submenu-label">Form Element</span></a></li>
                                        <li><a href="form_wizard.html"><span
                                            className="submenu-label">Form Wizard</span></a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="timeline.html">
								<span className="menu-icon">
									<i className="fa fa-clock-o fa-lg"></i>
								</span>
                                        <span className="text">
									Timeline
								</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="gallery.html">
								<span className="menu-icon">
									<i className="fa fa-picture-o fa-lg"></i>
								</span>
                                        <span className="text">
									Gallery
								</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="inbox.html">
								<span className="menu-icon">
									<i className="fa fa-envelope fa-lg"></i>
								</span>
                                        <span className="text">
									Inbox
								</span>
                                        <span className="badge badge-danger bounceIn animation-delay6">4</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="email_selection.html">
								<span className="menu-icon">
									<i className="fa fa-tasks fa-lg"></i>
								</span>
                                        <span className="text">
									Email Template
								</span>
                                        <small className="badge badge-warning bounceIn animation-delay7">New</small>
                                        <span className="menu-hover"></span>
                                    </a>
                                </li>
                                <li className="openable">
                                    <a href="#">
								<span className="menu-icon">
									<i className="fa fa-magic fa-lg"></i>
								</span>
                                        <span className="text">
									Multi-Level menu
								</span>
                                        <span className="menu-hover"></span>
                                    </a>
                                    <ul className="submenu second-level">
                                        <li className="openable">
                                            <a href="#">
                                                <span className="submenu-label">menu 2.1</span>
                                                <span
                                                    className="badge badge-danger bounceIn animation-delay1 pull-right">3</span>
                                            </a>
                                            <ul className="submenu third-level">
                                                <li><a href="#"><span className="submenu-label">menu 3.1</span></a></li>
                                                <li><a href="#"><span className="submenu-label">menu 3.2</span></a></li>
                                                <li className="openable">
                                                    <a href="#">
                                                        <span className="submenu-label">menu 3.3</span>
                                                        <span
                                                            className="badge badge-danger bounceIn animation-delay1 pull-right">2</span>
                                                    </a>
                                                    <ul className="submenu fourth-level">
                                                        <li><a href="#"><span className="submenu-label">menu 4.1</span></a>
                                                        </li>
                                                        <li><a href="#"><span className="submenu-label">menu 4.2</span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="openable">
                                            <a href="#">
                                                <span className="submenu-label">menu 2.2</span>
                                                <span
                                                    className="badge badge-success bounceIn animation-delay2 pull-right">3</span>
                                            </a>
                                            <ul className="submenu third-level">
                                                <li className="openable">
                                                    <a href="#">
                                                        <span className="submenu-label">menu 3.1</span>
                                                        <span
                                                            className="badge badge-success bounceIn animation-delay1 pull-right">2</span>
                                                    </a>
                                                    <ul className="submenu fourth-level">
                                                        <li><a href="#"><span className="submenu-label">menu 4.1</span></a>
                                                        </li>
                                                        <li><a href="#"><span className="submenu-label">menu 4.2</span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#"><span className="submenu-label">menu 3.2</span></a></li>
                                                <li><a href="#"><span className="submenu-label">menu 3.2</span></a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="alert alert-info">
                                Welcome to Endless Admin. Do not forget to check all my pages.
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-inner scrollable-sidebar">
                        <div className="user-block clearfix">
                            <div className="detail">
                                <strong className="text-red"> MENU DE ADMINISTRACIÓN</strong>
                            </div>
                        </div>
                        <div className="main-menu">
                            <ul>
                                <li menu="/gestionpredial">
                                    <Link to={"/gestionpredial"}>
                                        <span className="menu-icon">
                                            <img src="/img/hogar.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Gestión Predial
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/area-list">
                                    <Link to={"/area-list"}>
                                        <span className="menu-icon">
                                            <img src="/img/organigrama.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Áreas
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/list-trabajadores">
                                    <Link to={"/list-trabajadores"}>
                                        <span className="menu-icon">
                                            <img src="/img/agregar-usuario.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Trabajadores
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>


                                <li menu="/list-equipos2">
                                    <Link to={"/list-equipos2"}>
                                        <span className="menu-icon">
                                            <img src="/img/equipo.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Equipos
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>



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

                                <li menu="/partidas">
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
                                <li menu="/solicitud-list">
                                    <Link to={"/solicitud-list"}>
                                        <span className="menu-icon">
                                            <img src="/img/comunicaciones.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Soli. de Inf. Entidades
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/docinternos">
                                    <Link to={"/docinternos"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Doc. Internos
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>

                                <li menu="/docinternos">
                                    <Link to={"/acta-list"}>
                                        <span className="menu-icon">
                                            <img src="/img/expediente.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                            Acta de trabajo
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                <li menu="/predio-list">
                                    <Link to={"/predio-list"}>
                                        <span className="menu-icon">
                                            <img src="/img/map.svg" className="btn-siderbar" ></img>
                                        </span>
                                        <span className="text text-red">
                                           Predios Individualizados
                                        </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                <li menu="/indicadores">
                                    <Link to={"/indicadores"}>
                                        <span className="menu-icon">
                                            <img src="/img/grafico-de-lineas.svg" className="btn-siderbar" ></img>
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


            </>
        );
    }
}

export default SidebarAdm;