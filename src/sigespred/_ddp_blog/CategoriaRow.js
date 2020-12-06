import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
const {$} = window;

export const CategoriaRow =({categoria,nro, callback}) => {
    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const eliminar = (idcategoria) => {
        callback(idcategoria);
    }
    return (
        <>
            <tr key={`trrowkey_${nro}`}> 
                <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
                <td key={`tdrowkey_2${nro}`}>{categoria.id}</td>
                <td key={`tdrowkey_3${nro}`}>{categoria.descripcion}</td>
                <td key={`tdrowkey_4${nro}`}>{categoria.usuaregistraid}</td>
                <td key={`tdrowkey_5${nro}`}>{categoria.fecharegistro}</td>
                {/* <td key={`tdrowkey_6${nro}`}>{categoria.codigostd}</td> 
                <td key={`tdrowkey_7${nro}`}>{categoria.fecharecepcion}</td>
                <td key={`tdrowkey_8${nro}`}>{categoria.numdocrecepcion}</td>
                <td key={`tdrowkey_9${nro}`}>{categoria.archivorespuesta}</td>
                <td key={`tdrowkey_10${nro}`}>{categoria.usuario}</td>
                <td key={`tdrowkey_11${nro}`}>{categoria.fecharegistro}</td> */}
                {/* <td></td> */}
                {/* <td>{docinterno.observacion}</td>
                { partida.estadoatencion == 'ATENDIDO' ? <td className="colorCeldaAtendido" > <span className="badge badge-info">{partida.estadoatencion}</span></td> : <td className="colorCeldaPendiente"><span className="badge badge-danger">{partida.estadoatencion}</span></td>   } */}
                <td>
                    <div className="btn-group pull-right">
                        {/* <Link  to={`/docinternos-respuesta/${docinterno.id}`}  className="btn btn-xs btn-default" type="button"  data-toggle="tooltip"  data-original-title={ "Respuesta" }><i
                            className="fa fa-envelope fa-lg "></i></Link> */}
                        <Link  to={`/categoria-edit/${categoria.id}`}  className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Edicion" }><i
                            className="fa fa-edit fa-lg"></i></Link>
                        {/* <Link  to={`/docinternos-del/${docinterno.id}`}   className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Eliminar" }><i
                            className="fa fa-trash-o fa-lg"></i></Link> */}

                        <a key={`arowkey_${nro}`} onClick={() => eliminar(categoria.id)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip"  data-original-title={ "Eliminar"}><i
                            className="fa fa-trash-o fa-lg"></i></a>    



                    </div>
                </td>
            </tr>  
        </>
    )
}
