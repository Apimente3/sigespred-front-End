import React, {Component} from 'react';
import Aeropuertarios from './Aeropuertarios';
import Ferroviarios from './Ferroviarios';
import Puertarios from './Puertarios';
import Viales from './Viales';
import HeaderConceciones from './Header';
import Header from '../header/Header';
import './styles.css'

class Concesiones extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <HeaderConceciones></HeaderConceciones>
              
                <div className="container">
                    <div className="row">
                        <Aeropuertarios></Aeropuertarios>
                        <Ferroviarios></Ferroviarios>
                        <Puertarios></Puertarios>
                        <Viales></Viales>
                    </div>
                 
                </div>
            
            </div>
        );
    }
}

export default Concesiones;