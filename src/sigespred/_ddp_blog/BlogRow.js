import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const { $ } = window;
export const BlogRow =({blog,nro, callback}) => {

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    const eliminar = (idblog) => {
        callback(idblog);
    }
    return (
        <>
        <tr key={`trrowkey_${nro}`}> 
            <td key={`tdrowkey_1${nro}`}>{nro+1}</td>
            <td key={`tdrowkey_2${nro}`}>{blog.id}</td>
            <td key={`tdrowkey_3${nro}`}>{blog.titulo}</td>
            <td key={`tdrowkey_4${nro}`}>{blog.contenido}</td>
            <td key={`tdrowkey_5${nro}`}>{blog.categoria}</td>
            {(blog.estado &&  blog.estado.toUpperCase() === 'PUBLICADO')
            ?<td key={`tdrowkey_6${nro}`}><span className="badge badge-success">{blog.estado}</span></td>
            :<td key={`tdrowkey_7${nro}`}>
                <Link  to={`/blog-edit/${blog.id}`} data-toggle="tooltip" 
                    data-placement="bottom" data-original-title={ "Publicar el post" }>
                    <span className="badge badge-danger">
                        {blog.estado}
                    </span>
                </Link>
                </td>
            }
            {/* <td key={`tdrowkey_6${nro}`}>{blog.estado}</td> */}
            <td key={`tdrowkey_8${nro}`}>{blog.usuario}</td>
            <td key={`tdrowkey_9${nro}`}>{blog.fecharegistro}</td>
            {/* <td></td> */}
            {/* <td>{docinterno.observacion}</td>
            { partida.estadoatencion == 'ATENDIDO' ? <td className="colorCeldaAtendido" > <span className="badge badge-info">{partida.estadoatencion}</span></td> : <td className="colorCeldaPendiente"><span className="badge badge-danger">{partida.estadoatencion}</span></td>   } */}
            <td>
                <div className="btn-group pull-right">
                    {/* <Link  to={`/docinternos-respuesta/${blog.id}`}  className="btn btn-xs btn-default" type="button"  data-toggle="tooltip"  data-original-title={ "Respuesta" }><i
                        className="fa fa-envelope fa-lg "></i></Link> */}
                    <Link  to={`/blog-edit/${blog.id}`}  className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Edicion" }>
                        <i className="fa fa-edit fa-lg"></i>
                    </Link>
                    {/* <Link  to={`/docinternos-del/${docinterno.id}`}   className="btn btn-xs btn-default" type="button"   data-toggle="tooltip"  data-original-title={ "Eliminar" }><i
                        className="fa fa-trash-o fa-lg"></i></Link> */}

                    <a key={`arowkey_${nro}`} onClick={() => eliminar(blog.id, blog.numdocrecepcion)}  className="btn btn-xs btn-default" type="button" data-toggle="tooltip"  data-original-title={ "Eliminar"}><i
                        className="fa fa-trash-o fa-lg"></i></a>    



                </div>
            </td>
        </tr>
    </>
    )
}
