import React from 'react';

const TableAgenda = ({cabecera, data=[], deleteTema}) => {
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
                    data.map((user, key) => (
                        
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{user.tema}</td>
                                <td>
                                    <div className="btn-group pull-right">

                                        <button class="btn btn-xs btn-default" type="button">
                                        <i
                                            class="fa fa-trash-o fa-lg"
                                            onClick={() => deleteTema(key)}
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

export default TableAgenda;