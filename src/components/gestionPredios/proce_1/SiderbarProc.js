import React from 'react';
import {Link} from "react-router-dom";


const SiderbarProc = (predio) => {
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
                                <Link  to={`/memoria-descriptiva/datos-solitante/${predio}`}>  
                            <span className="menu-icon">  
                    </span>
                                    <span className="text text-red">
                     Memoria Descriptiva
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
};

export default SiderbarProc;