import React, {useState,useRef} from 'react';
import SidebarAdm from "../SiderBarDiagnostico";
import {Link} from "react-router-dom";
import UploadFile from "../../solicitudes/UploadFile";
import FooterProcess from "../../../gestionPredios/FooterProcess";
import Header from "../../../header/Header";
import Tramo from "./Tramo";
import TramoAdd from "./TramoAdd";

const Tramos = () => {

    const [addtramo, setAddtramo] = useState(false);
    const ref = useRef(null);
    
   const agregarTramo=(e)=>{
        e.preventDefault()
        setAddtramo(true)
    }

    const cancelarRegistro = () => setAddtramo(false);
    
    return (
        <>
            <div>
                <SidebarAdm/>
                <Header></Header>

                <form>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Tramos Obras
                            <span className="line"></span>
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">

                            <div className="panel-body">
                                <fieldset className={'fielsettext'}>
                                    <legend align="center fielsettext">Tramos y Obras</legend>
                                </fieldset>

                            
                                    
                              
                                
                               <TramoAdd/>

             


                                <ul className="list-group">
                                    <Tramo props={{progresivaInicio: '0', progresivaFinal: '100'}}/>
                                    <Tramo props={{progresivaInicio: '101', progresivaFinal: '200'}}/>
                                    <Tramo props={{progresivaInicio: '201', progresivaFinal: '300'}}/>

                                </ul>

                                <hr/>
                           
                            </div>
                        </div>
                    </div>


                </form>
                <FooterProcess/>
            </div>
        </>
    );
};

export default Tramos;