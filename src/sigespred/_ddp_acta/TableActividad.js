import React from 'react';

const TableActividad = ({cabecera, data=[], deleteUser}) => {
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
                                <td>{user.actividadid}</td>
                                <td>{user.descripcion}</td>
                                <td>{user.nombre}</td>
                                <td>{user.fechacomp}</td>
                                <td>{user.producto}</td>
                                <td>
                                    <div className="btn-group pull-right">

                                        <button className="btn btn-xs btn-default">
                                        <i
                                            class="fa fa-trash-o fa-lg"
                                            onClick={() => deleteUser(key)}
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