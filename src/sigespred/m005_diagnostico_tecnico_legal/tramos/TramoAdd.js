import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Styles.css'

const TramoAdd = () => {
    
    
    const [addtramo, setAddtramo] = useState(false);


    const agregarTramo=(e)=>{
        e.preventDefault()
        setAddtramo(true)
    }

    const CancelTramo=(e)=>{
        e.preventDefault()
        setAddtramo(false)
    }
    
    
    return (
        <>

            <div className="form-group ">
                <div className="col-lg-offset-0 col-lg-12 ">
                    <button onClick={agregarTramo} type="button"
                            className="btn btn-default btn-sm btn-control pull-right ">+ Agregar
                    </button>


                </div>

            </div>
            
            { addtramo ? (
                <div className="panel-body addTramo">
                    <fieldset className={'fielsettext'}>
                        <legend align="center fielsettext">Registrar de Tramos y Obras</legend>
                    </fieldset>
                    <form className="innerForm">
                        <div className="form-group">
                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Progresiva Inicio</label>
                            <div className="col-lg-4">
                                <input className="form-control input-sm" type="text"
                                       placeholder="" />
                            </div>

                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Progresiva Final</label>
                            <div className="col-lg-4">
                                <input className="form-control input-sm" type="text"
                                       placeholder="" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Polygono</label>
                            <div className="col-lg-4">
                                <input type="file"
                                       placeholder=""/>
                            </div>


                        </div>

                        <hr/>
                        <div className="panel-body">
                            <div className="form-group ">
                                <div className="col-lg-offset-8 col-lg-10">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={CancelTramo}
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>

                                </div>

                            </div>

                        </div>


                    </form>
                </div>
            ):''}
           
            <hr/>
        </>
    );
};

export default TramoAdd;