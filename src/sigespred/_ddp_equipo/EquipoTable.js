import React from 'react';

const EquipoTable = ({cabecera, data=[], deleteUser}) => {
    return (
        <>
            <table class="table table-bordered table-condensed table-hover table-striped" id="dataTableEquipo">
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
                    data.users.map((user, key) => (
                        
                            <tr key={key}>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.monitor ? "SI" : "NO"}</td>
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

export default EquipoTable;