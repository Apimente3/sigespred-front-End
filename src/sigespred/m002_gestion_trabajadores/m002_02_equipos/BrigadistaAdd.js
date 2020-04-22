import React, {useState} from 'react';
import {Link} from "react-router-dom";


const IntegranteAdd = () => {


    const [addIntegrante, setaddIntegrante] = useState(false);


    const agregarTramo=(e)=>{
        e.preventDefault()
        setaddIntegrante(true)
    }

    const CancelTramo=(e)=>{
        e.preventDefault()
        setaddIntegrante(false)
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

            { addIntegrante ? (
                <div className="panel-body addIntegrante" >
                    <fieldset className={'fielsettext'}>
                        <legend align="center fielsettext">Registrar Integrante</legend>
                    </fieldset>
                    <form className="innerForm">
                        <div className="form-group">
                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Buscar Trabajador</label>
                            <div className="col-lg-4">
                                <input className="form-control input-sm" type="text"
                                       placeholder="" />
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

export default IntegranteAdd;