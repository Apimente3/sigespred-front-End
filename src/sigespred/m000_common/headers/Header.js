import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DrpAministrativo from "./DrpAministrativo";

class Header extends Component {
    render() {
        return (

                <header className="navbar navbar-fixed-top bg-white">
                    <div className="container">
                        <div className="navbar-header">
                            <button className="navbar-toggle" type="button" data-toggle="collapse"
                                    data-target=".bs-navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to={`/`} href="#" className="navbar-brand" title={"Sistema de Gestion de Predios"}>
                                <b> 
                                  
                                    SIGESPRED  <span className="text-danger">MTC</span>
                                </b>
                                
                            </Link>
                        </div>
                        <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                            <ul className="nav navbar-nav navbar-right">
                                {/* <li className='menuprincipalmedium'>
                                    <center>  <Link to={`/predios-list`} className="top-link active">
                                        <img src='/img/m_predio.svg' height={'25'}></img><br></br><b>Exp.Adqu.Predios</b></Link>
                                    </center>
                                </li>
                                <li className='menuprincipalbig'>
                                    <center>  <Link to={`/predios-list`} className="top-link active">
                                        <img src='/img/m_interferencia.svg' height={'25'}></img><br></br><b>Exp.Lib.Interferencias</b></Link>
                                    </center>
                                </li>
                                <li className='menuprincipalmedium'>
                                    <center>  <Link to={`/predios-list`} className="top-link active">
                                        <img src='/img/mejoras.svg' height={'25'}></img><br></br><b>Exp.Pago Mejoras</b></Link>
                                    </center>
                                </li>
                                <li className='menuprincipalbig2'>
                                    <center>  <Link to={`/cuadro-control`} className="top-link active">
                                        <img src='/img/m_trasnferencia.svg' height={'25'}></img><br></br><b>Exp.Tranf.Interestatales</b></Link>
                                    </center>
                                </li>*/}

                                <li className='menuprincipalbig2'>
                                    <center>  <Link to={`/cuadro-control`} className="top-link active">

                                        <img src='/img/m_cuadro.svg' height={'25'}></img><br></br><b>Cuadro Control</b></Link>
                                    </center>
                                </li>
                              
                               
                              <DrpAministrativo/>
                             
                            </ul>
                           
                        </nav>
                    </div>
                </header>
            


        );
    }
}

export default Header;