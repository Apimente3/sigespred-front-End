import React from 'react';
import {Link} from "react-router-dom";
import './memoriadescriptiva.css'

const SiderBarMemoriaDescriptiva = (predio) => {
    console.log(predio);
 
    const codpredio=predio.predio;
    return (
        <div>
            <aside className="fixed skin-1">
                <div className="sidebar-inner scrollable-sidebar">

                    <div className="user-block clearfix">
                        <div className="detail">
                            <strong className="text-red"> Memoria Descriptiva</strong>
                        </div>
                    </div>
                    <div className="main-menu">
                        <ul>


                            <li menu="proyectos">
                                <Link to={`/memoria-descriptiva/condicion-legal/${codpredio}`}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                        1. CONDICION LEGAL
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            <li menu="proyectos">
                                <Link  to={`/memoria-descriptiva/datos-solitante/${codpredio}`}>
                            <span className="menu-icon">  
                    </span>
                                    <span className="text text-red">
                      2. DATOS SOLICITANTE
                    </span>
                    <span className="menu-hover"></span>
                                </Link>
                            </li>    
                            
                            <li menu="proyectos">
                                <Link  to={`/memoria-descriptiva/datos-generales/${codpredio}`}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                     3. DATOS GENERALES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>   
                            
                            <li menu="proyectos">
                                <Link  to={`/memoria-descriptiva/descripcion/${codpredio}`}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                     4. DESCRIPCIÓN
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>  
                            
                            
                            <li menu="proyectos">
                                <Link  to={`/memoria-descriptiva/entorno/${codpredio}`}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                    5. DESC. DEL ENTORNO
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>     
                            
                            <li menu="proyectos">
                                <Link to={`/memoria-descriptiva/terreno-afectado/${codpredio}`}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                    6. TERRENO AFECTADO
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                            
                            <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                   7. EDIFICACIONES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li> 
                            
                            <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                  8. PLANTACIONES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                             
                             
                                <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
                9. PERJUICIO ECONÓMICO
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>      
                            
                            <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
               10. ELEMENTOS A TASAR
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                            
                               <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
              11. DOC. ADJUNTOS
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                               <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
             12. OBSERVACIONES
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li> 
                            <li menu="proyectos">
                                <Link to={"proyecto-list"}>
                            <span className="menu-icon">
                      
                    </span>
                                    <span className="text text-red">
          13. PANEL FOTOGRÁFICO 
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                            
                            

                        </ul>


                    </div>
                    <div className=" clearfix">
                        <div className="detail">
                            <a href="" title={'Generar Memoria Descriptiva'}>
                                
                           
                            <strong className="text-red">
                                <center>
                               <img  className={'generar-memoria'} src={'/img/generar_md.svg'}></img>
                                </center>
                            </strong>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>


        </div>
    );
};

export default SiderBarMemoriaDescriptiva;