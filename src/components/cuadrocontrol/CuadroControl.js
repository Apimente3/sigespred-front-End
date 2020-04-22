import React, {Component} from 'react';
import SidebarAdm from "./SidebarAdm";
import Header from "../header/Header";
import CuadroHeader from "./cuadroHeader";
import CuadroRow from "./cuadroRow";
import FilterPred from "../proyectos/FilterPred";
import {Link} from "react-router-dom";

class CuadroControl extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                
                <div className="row">
                    <div className="col-md-2 mtop150">
                        <FilterPred/>
                    </div>
                    <div className="col-md-9">
                        <div className="panel panel-default  cuadrocontainer" >
                            <div className="panel-heading">
                                <h3>CUADRO DE CONTROL DE AVANCE DE PREDIOS</h3>   
                            </div>

                            <table className="table table-bordered table-condensed table-hover table-striped">
                                <CuadroHeader/>
                                <tbody>

                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>

                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>        <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                <CuadroRow/>
                                
                                </tbody>
                            </table>

                            <div className="panel-body">
                                <span>Total Predios</span><span className="badge m-left-xs">12</span><br></br>
                                <span>No iniciado</span><span className="badge badge-success m-left-xs">23</span>
                                <span>En Proceso</span><span className="badge badge-warning m-left-xs">37</span>
                                <span>Terminado</span><span className="badge badge-danger m-left-xs">7</span>
                            </div>

                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-10">
                                        <button id="btnguardar" type="submit" className="btn btn-default btn-sm btn-control">Exportar PDF
                                        </button>
                                        <Link to={`/predios-list`} className="btn btn-default btn-sm btn-control">Exportar Excel</Link>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
               
      
           
            </div>
        );
    }
}

export default CuadroControl;