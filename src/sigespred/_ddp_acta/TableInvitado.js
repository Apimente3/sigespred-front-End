import React from 'react';

const TableInvitado = ({data=[], deleteinvitado}) => {
    const cabecera = ["ID", "NOMBRE", "ÁREA O ENTIDAD","ACCIONES"];
    return (
        <>
            <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableInvitado">
                <thead>
                <tr>
                    { cabecera.map((item,i)=>(
                        <th key={i}>{item}</th>
                    ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map((invitado, key) => (
                        
                            <tr key={key}>
                                <td key={`td_${key}_1`}>{key+1}</td>
                                <td key={`td_${key}_2`}>{invitado.nombreinvitado}</td>
                                <td key={`td_${key}_3`}>{invitado.areaentidad}</td>
                                <td key={`td_${key}_4`} className="acciones-1bot pull-center">
                                    <div className="btn-group">

                                        <button className="btn btn-xs btn-default" type="button">
                                        <i
                                            className="fa fa-trash-o fa-lg"
                                            onClick={() => deleteinvitado(invitado.id)}
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

export default TableInvitado;