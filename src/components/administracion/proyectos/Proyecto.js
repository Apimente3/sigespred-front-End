import React, {Component} from 'react';
import ContentLoader from "react-content-loader"
import {Link} from 'react-router-dom';
import ProyectoLoader from "./ProyectoLoader";

const Proyecto =({proyecto})=>{

   const {codigo,icono,tipo_infraestructura,descripcion}=proyecto;

        return (


            <div className="search-container">
               
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="search-header">

                                   
                                    <a href="#" className="h4 inline-block">
                                        <a title={tipo_infraestructura} dangerouslySetInnerHTML={{__html: icono}}></a>  {descripcion}  -  <small>{codigo}</small>
                                    </a>

                                    <div className="btn-group pull-right  margin-rigth-20">
                                        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                            className="caret"></span></button>
                                        <ul className="dropdown-menu">

                                            <li><Link to={`/predio-edit/PM1G-AEROTUM-PR-001`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</Link></li>
                                            <li><Link to={`/predio-delete/PM1G-AEROTUM-PR-001`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                            <li className="divider"></li>
                                            <li><Link  to={`/proce-1/PM1G-AEROTUM-PR-001`}><i className="fa fa-home" aria-hidden="true"></i> Gestión de Predios</Link></li>

                                        </ul>
                                    </div>

                                  


                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="overview-value">
                                                <a style={{marginTop:'15px'}} href="#" className="thumbnail pull-left">
                                                    <img style={{height:'100px'}} data-src="holder.js/250x250" alt="80x80"
                                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABaElEQVR4nO3WMbLDIAxF0ex/Kero3NDRUdKzBG2BVGIcZ5z/EwrnZW7xCluOJpyRwTd3H+Tz3K7+A+oBEEAApQMggABKB0AAAZQOgAACKB0AAQRQOgACCKB0AAQQQOkACCCA0gEQQAClAyCAAEoHQAB/HLC1NsxsprU2a733h1rv/bKeXwtoZiPnPNx9bNs2zGzWUkoPtZTSZT2/EjAmpZQy3H2UUuZURK3WOtx91FrnNEUtIHLOT7V3e0oCvpqW4+LiOhYfaAEUPVZ6SgLGgiNx77jY4/Sc/W61pxRgbOjxusVU9d7/NS3x/H76VntKAb6aiL/2q7OTdqWnHOBxw98fBu7Pe9n+xEwpzckys1lb6SkHuJ+CyP51Ovtmi4Mjno3rQPukpyzgrwdAAAGUDoAAAigdAAEEUDoAAgigdAAEEEDpAAgggNIBEEAApQMggABKB0AAAZQOgAACKB0AAQRQOgACCKB07tt5J95byMy/AAAAAElFTkSuQmCC"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-8">

                                            <ul className="list-group collapse in" id="feedList">
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <small className="text-muted text-danger font-14">DESCRIPCION</small><br/>
                                                        <span>{descripcion}</span><br></br>
                                                      
                                                    </div>
                                                </li>
                                               
                                              

                                            </ul>
                                        </div>


                                        <div className="col-md-2">

                                            <ul className="list-group collapse in" id="feedList">
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <small className="text-muted text-danger font-14">Digital</small><br/>
                                                  <br/>
                                                        <i className="fa fa-file-pdf-o fa-4x text-danger"></i>

                                                    </div>
                                                </li>



                                            </ul>
                                        </div>
                                    




                                    </div>

                                </div>




                            </div>
                        </div>


            </div>
        );
  
}

export default Proyecto;