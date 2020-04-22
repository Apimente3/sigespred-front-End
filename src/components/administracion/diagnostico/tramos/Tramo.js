import React, {useState} from 'react';


const Tramo = ({props}) => {

    const [edit, setEdit] = useState(false);

    const {progresivaInicio, progresivaFinal, file_id} = props

    const modeEdit=(e)=>{
        e.preventDefault()
        setEdit(true)
    }

    const cancelEdir=(e)=>{
        e.preventDefault()
        setEdit(false)
    }

    return (
        <>

            { edit ? (
                
                <div className="panel-body addTramo">
                    <fieldset className={'fielsettext'}>
                        <legend align="center fielsettext">Edicion de Tramos y Obras</legend>
                    </fieldset>
                    <form className="innerForm">
                        <div className="form-group">
                            <label className="col-lg-2 control-label"><span
                            className="obligatorio">* </span> Progresiva Inicio</label>
                            <div className="col-lg-4">
                                <input className="form-control input-sm" type="text"
                                                             placeholder="" Value={progresivaInicio}/>
                            </div>

                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Progresiva Final</label>
                            <div className="col-lg-4">
                                <input className="form-control input-sm" type="text"
                                       placeholder="" Value={progresivaFinal}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-2 control-label"><span
                                className="obligatorio">* </span> Polygono</label>
                            <div className="col-lg-4">
                                <input  type="file"
                                       placeholder="" />
                            </div>

                          
                        </div>
                       
                        <hr/>
                        <div className="panel-body">
                            <div className="form-group ">
                                <div className="col-lg-offset-8 col-lg-10">
                                    <button id="btnguardar" type="submit" className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={cancelEdir} className="btn btn-default btn-sm btn-control">Cancelar</button>

                                </div>

                            </div>

                        </div>


                    </form>
                </div>
            ):
            
                ( <li className=" clearfix file-content">
                    <div className="activity-icon small">
                        PDF
                    </div>
                    <div className="pull-left m-left-sm ">
                        <span><b>Progresiva Inicio :</b>{progresivaInicio}</span><br/>
                        <hr/>
                        <span><b>Progresiva Inicio :</b>{progresivaFinal}</span><br/>
                    </div>
                    <div className="btn-group hover-dropdown pull-right">
                        <a href="#" onClick={modeEdit}  className="btn btn-xs btn-default" type="button">
                            <i className="fa fa-edit fa-lg"></i> </a>

                        <a className="btn btn-xs btn-default" type="button"><i
                            className="fa fa-trash-o fa-lg"></i></a>
                    </div>
                </li>)
            }
            
            
           
        </>
    );
};

export default Tramo;