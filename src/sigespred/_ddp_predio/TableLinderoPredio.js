import React, { useEffect } from 'react'
const {$} = window;
export const TableLinderoPredio =({data=[], deletelindero, editarlindero}) => {

    const cabecera = ["ID", "LINDERO", "COLINDANCIAS", "TRAMO", "LONGITUD (m)", "NUMERACION MUNICIPAL", "ACCIONES"];
    
    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <>
            <div>
                <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableLinderoPredio">
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
                        data.map((lindero, key) => (
                                <tr key={key}>
                                    <td key={`td_${key}_1`}>{key+1}</td>
                                    <td key={`td_${key}_2`}>{lindero.tipolindero}</td>
                                    <td key={`td_${key}_3`}>{lindero.colindancia}</td>
                                    <td key={`td_${key}_4`}>{lindero.tramo}</td>
                                    <td key={`td_${key}_5`}>{lindero.longitud}</td>
                                    <td key={`td_${key}_6`}>{lindero.nummunicipal}</td>
                                    <td key={`td_${key}_7`} className="acciones-1bot pull-center">
                                        <div className="btn-group">
                                            <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                                data-original-title={ "Actualizar estados de compromiso" }>
                                                <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                                onClick={() => editarlindero(lindero.id)}
                                            />
                                            </button>

                                            <button className="btn btn-xs btn-default" type="button">
                                            <i className="fa fa-trash-o fa-lg" data-toggle="tooltip" data-original-title={ "Eliminar Lindero" }
                                                onClick={() => deletelindero(lindero.id)}
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
