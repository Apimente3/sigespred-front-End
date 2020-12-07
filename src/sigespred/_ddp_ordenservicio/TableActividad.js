import React from 'react';

const TableActividad = ({data=[], deleteactividad, editactividad}) => {
    const cabecera = ["ID", "DETALLE ACTIVIDAD/ALCANCE", "ACCIONES"];
    return (
        <>
            <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableActividad">
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
                    data.map((actividad, key) => (
                            <tr key={key}>
                                <td key={`td_${key}_1`}>{key+1}</td>
                                <td key={`td_${key}_2`}>{actividad.descripcionactividad}</td>
                                <td key={`td_${key}_6`} className="acciones-1bot pull-center">
                                    <div className="btn-group">
                                        <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                            data-original-title={ "Actualizar Actividad/Alcance" }>
                                            <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                            onClick={() => editactividad(actividad.id)}
                                        />
                                        </button>

                                        <button className="btn btn-xs btn-default" type="button">
                                        <i className="fa fa-trash-o fa-lg"
                                            onClick={() => deleteactividad(actividad.id)}
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