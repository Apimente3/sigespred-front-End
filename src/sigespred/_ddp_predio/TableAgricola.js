import React, { useEffect } from 'react'
const {$} = window;
export const TableAgricola =({data=[], deleteAgricola, editarAgricola}) => {

    const cabecera = ["ID", "TIPO", "DESCRIPCION", "%", "ACCIONES"];

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    
    return (
        <>
            <div>
                <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableAgricola">
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
                        data.map((agricola, key) => (
                                <tr key={key}>
                                    <td key={`td_${key}_1`}>{key+1}</td>
                                    <td key={`td_${key}_2`}>{agricola.tipoagricola}</td>
                                    <td key={`td_${key}_3`}>{agricola.descripcion}</td>
                                    <td key={`td_${key}_4`}>{agricola.porcentaje}</td>
                                    <td key={`td_${key}_5`} className="acciones-1bot pull-center">
                                        <div className="btn-group">
                                            <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                                data-original-title={ "Actualizar estados de compromiso" }>
                                                <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                                onClick={() => editarAgricola(agricola.id)}
                                            />
                                            </button>

                                            <button className="btn btn-xs btn-default" type="button">
                                            <i className="fa fa-trash-o fa-lg" data-toggle="tooltip" data-original-title={ "Eliminar Agricola" }
                                                onClick={() => deleteAgricola(agricola.id)}
                                            />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))
                    }
                    
                    </tbody>
                </table>        
            </div>
        </>
    )
}
