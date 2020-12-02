import React, { useEffect } from 'react'
const {$} = window;
export const TableGanaderia  =({data=[], deleteGanaderia, editarGanaderia}) => {
    const cabecera = ["ID", "TIPO", "CANTIDAD", "ACCIONES"];

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
         <>
            <div>
                <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableGanaderia">
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
                        data.map((ganaderia, key) => (
                                <tr key={key}>
                                    <td key={`td_${key}_1`}>{key+1}</td>
                                    <td key={`td_${key}_2`}>{ganaderia.tipoganadero}</td>
                                    <td key={`td_${key}_3`}>{ganaderia.cantidad}</td>
                                    <td key={`td_${key}_4`} className="acciones-1bot pull-center">
                                        <div className="btn-group">
                                            <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                                data-original-title={ "Actualizar estados de compromiso" }>
                                                <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                                onClick={() => editarGanaderia(ganaderia.id)}
                                            />
                                            </button>

                                            <button className="btn btn-xs btn-default" type="button">
                                            <i className="fa fa-trash-o fa-lg" data-toggle="tooltip" data-original-title={ "Eliminar Ganaderia" }
                                                onClick={() => deleteGanaderia(ganaderia.id)}
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
