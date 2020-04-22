import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header404 extends Component {
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
                        <Link to={`/predios-list`} href="#" className="navbar-brand" title={"Sistema de Gestion de Predios"}><span className="text-danger">MTC</span> SIGESPRED</Link>
                    </div>
       
                </div>
            </header>



        );
    }
}

export default Header404;