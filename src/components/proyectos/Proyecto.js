import React, {Component} from 'react';
import ContentLoader from "react-content-loader"
import {Link} from 'react-router-dom';
import PredioLoader from "./PredioLoader";


class Proyecto extends Component {

    state = {
        iscargado: false
    };

    componentDidMount() {
        this.timer = setInterval(
            () => this.setState(prevState => ({ iscargado: !prevState.test })),
            2000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
  


    
    render() {
        const {iscargado}=this.state;
        return (
          
         
            <div className="search-container trabajdorlist">
                {
                    iscargado?
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="search-header">
                                    <a href="#" className="h4 inline-block">
                                        <i className="fa fa-plane "
                                           aria-hidden="true"></i>   PM1G-AEROTUM-PR-001
                                    </a>

                                    <div className="btn-group pull-right  margin-rigth-20">
                                        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">Acciones <span
                                            className="caret"></span></button>
                                        <ul className="dropdown-menu">
                                            
                                            <li><Link to={`/predio-edit/PM1G-AEROTUM-PR-001`} href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</Link></li>
                                            <li><Link to={`/predio-delete/PM1G-AEROTUM-PR-001`} href="#"><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminar</Link></li>
                                            <li className="divider"></li>
                                            <li><Link  to={`/proce-0/PM1G-AEROTUM-PR-001`}><i className="fa fa-home" aria-hidden="true"></i> Gestión de Predios</Link></li>

                                        </ul>
                                    </div>

                                    <div className="ribbon-wrapper">
                                        <div className="ribbon-inner bg-success shadow-pulse font-9">
                                            Adquisicion
                                        </div>
                                    </div>


                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="overview-value">
                                                <div className="h2">P-01</div>
                                                <div className="text-muted text-danger">PROCESO ACTUAL</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">

                                            <ul className="list-group collapse in" id="feedList">
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>AERO PUERTO TUMBES</span><br></br>
                                                        <small className="text-muted text-danger font-7">CONCESION</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>CAP FAP PEDRO CANGA RODRIGUEZ</span><br></br>
                                                        <small className="text-muted text-danger font-7">PROYECTO</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>TR KM 1- 20</span><br></br>
                                                        <small className="text-muted text-danger font-7">OBRA</small>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="col-md-3">
                                            <ul className="list-group collapse in" id="feedList">
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>TUMBES</span><br></br>
                                                        <small className="text-muted text-danger font-7">DEPARTAMENTO</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>TUMBES</span><br></br>
                                                        <small className="text-muted text-danger font-7">PROVINCIA</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>TUMBES</span><br></br>
                                                        <small className="text-muted text-danger font-7">DISTRITO</small>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="col-md-3">

                                            <ul className="list-group collapse in" id="feedList">
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>BRIGADA - 001</span><br></br>
                                                        <small className="text-muted text-danger font-7">BRIGADA</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>Armando Pimentel Abril</span><br></br>
                                                        <small className="text-muted text-danger font-7">TECNICO</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>Yuliana Cconislla</span><br></br>
                                                        <small className="text-muted text-danger font-7">LEGAL</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item clearfix predio-list">

                                                    <div className="pull-left m-left-sm ">
                                                        <span>Renato Minano Elvar</span><br></br>
                                                        <small className="text-muted text-danger font-7">COORDINADOR</small>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>




                                    </div>

                                </div>




                            </div>
                        </div>: <PredioLoader/>
                }
               
               

            </div>
        );
    }
}

export default Proyecto;