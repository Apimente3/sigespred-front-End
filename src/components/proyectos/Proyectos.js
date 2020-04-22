import React, {Component} from 'react';
import Header from "../header/Header";
import {connect} from 'react-redux';
import HeaderSearch from "./HeaderSearch";
import Busqueda from "./Busqueda";
import FilterDepartamento from "./FilterDepartamento";
import './styles.css'
import Ordering from "./Ordering";
import Proyecto from "./Proyecto";
import FilterTipoProyecto from "./FilterTipoProyecto";
import FilterPred from "./FilterPred";
import Footer from "../footer/Footer";

class Proyectos extends Component {
    render() {
        return (
            <div>
                
                <Header></Header>
                <div>
                    <div id="breadcrumb">
                        <ul className="breadcrumb">
                            <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                            <li className="active">Busqueda de Proyectos</li>
                        </ul>
                    </div>
                    <div className="padding-md container">
                        <div className={'spacefilter'}></div>
                        <HeaderSearch/>
                        <div className="row">
                            <div className="col-md-3">
                             
                                <FilterPred/>
                        
                            </div>
                            <div className="col-md-9">
                                <Busqueda/>
                               
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Proyecto/>
                                <Ordering/>
                            </div>
                        </div>
                     
                    </div>
                    
                </div>
                <Footer/> 
            </div>
           
        );
    }
}

export default Proyectos;