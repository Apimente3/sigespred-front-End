import React from 'react';

const TableProducto = ({data=[], deleteproducto, editproducto}) => {
    const cabecera = ["ID", "NRO. ENTREGABLE", "PLAZO ENTREGA (DÍAS)", "% PAGO", "DETALLE", "ACCIONES"];
    return (
        <>
            <table className="table table-bordered table-condensed table-hover table-striped" id="dataTableproductoPredio">
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
                    data.map((producto, key) => (
                            <tr key={key}>
                                <td key={`td_${key}_1`}>{key+1}</td>
                                <td key={`td_${key}_2`}>{producto.numentregable}</td>
                                <td key={`td_${key}_3`}>{producto.numdias}</td>
                                <td key={`td_${key}_4`}>{producto.porcentajepago}</td>
                                <td key={`td_${key}_5`}>{producto.detalleentregable}</td>
                                <td key={`td_${key}_6`} className="acciones-1bot pull-center">
                                    <div className="btn-group">
                                        <button className="btn btn-xs btn-default cursorpointer" type="button" data-toggle="tooltip" key={`btn_${key}_2`}
                                            data-original-title={ "Actualizar estados de compromiso" }>
                                            <i className="fa fa-edit fa-lg" key={`i_${key}_2`}
                                            onClick={() => editproducto(producto.id)}
                                        />
                                        </button>

                                        <button className="btn btn-xs btn-default" type="button">
                                        <i className="fa fa-trash-o fa-lg"
                                            onClick={() => deleteproducto(producto.id)}
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

export default TableProducto;