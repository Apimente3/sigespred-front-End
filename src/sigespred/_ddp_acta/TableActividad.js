import React from 'react';

const TableActividad = ({cabecera, data=[], deleteActividad, updateActividad}) => {
    return (
        <>
            <table class="table table-bordered table-condensed table-hover table-striped" id="dataTableActividad">
                <thead>
                <tr>
                    { cabecera.map((cabeza,i)=>(
                        <th key={i}>{cabeza}</th>
                    ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.ActaParticipante.map((user, key) => (
                        
                            <tr key={key}>
                                <td>{user.usuarioid}</td>
                                <td>{user.actividad}</td>
                                <td>{user.descripcion}</td>
                                <td>{user.nombre}</td>
                                <td>{user.fechacomp}</td>
                                <td>{user.producto}</td>
                                <td>
                                    <div className="btn-group pull-right">

                                        <button class="btn btn-xs btn-default" type="button">
                                        <i
                                            class="fa fa-edit fa-lg"
                                            onClick={() => updateActividad(key)}
                                        />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="btn-group pull-right">

                                        <button class="btn btn-xs btn-default" type="button">
                                        <i
                                            class="fa fa-trash-o fa-lg"
                                            onClick={() => deleteActividad(key)}
                                        />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                    ))
                }
                
                </tbody>
            </table>

        </>
    );
};

export default TableActividad;