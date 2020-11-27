import React from 'react';

const TableTitularPredio = ({data=[], deletetitular, edittitular}) => {
    const cabecera = ["ID", "NOMBRE", "TIPO DE DOCUMENTO", "NRO DE DOCUMENTO", "ESTADO CIVIL", "ACCIONES"];
    return (
        <>
            <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableTitularPredio">
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
                    data.map((titular, key) => (
                            <tr key={key}>
                                <td key={`td_${key}_1`}>{key+1}</td>
                                <td key={`td_${key}_2`}>{titular.nombretitular}</td>
                                <td key={`td_${key}_3`}>{titular.tipodocumento}</td>
                                <td key={`td_${key}_4`}>{titular.numerodocumento}</td>
                                <td key={`td_${key}_5`}>{titular.estadocivil}</td>
                                <td key={`td_${key}_6`} className="acciones-1bot pull-center">
                                    <div className="btn-group">
                                        <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                            data-original-title={ "Actualizar estados de compromiso" }>
                                            <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                            onClick={() => edittitular(titular.id)}
                                        />
                                        </button>

                                        <button className="btn btn-xs btn-default" type="button">
                                        <i className="fa fa-trash-o fa-lg"
                                            onClick={() => deletetitular(titular.id)}
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

export default TableTitularPredio;