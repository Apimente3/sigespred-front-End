import React from 'react';
import {Link} from "react-router-dom";

const SubListaDelete = ({data, cabecera, deleterow}) => {

    const sampleJSON = [
        {
          "descripcion": "Descripcion",
          "digital": "hola.doc",
          "memoria": ""
        },
        {
            "lamina": "Lámina 1",
            "digital": "hola.doc",
            "memoria": "ddd"
          }
        ];

    const removerElemento = (idelem) => {
        deleterow(idelem)
    }

    return (
        <>
                <table className="tableInside">
                    <thead>
                        <tr>
                            { cabecera.map((header,i)=>(
                                <th key={i}>{header}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((object, i) => (
                        <tr key={object.archivoid}>
                            <td key={`td_${i}_${object.archivoid}`}>
                                <span>{object.descripcion}</span>
                            </td>
                            <td>
                                <span>{object.archivodigital}</span>
                            </td>
                            <td>
                                <a className="btn btn-default btn-sm dropdown-toggle pull-left"
                                    title="Agregar a la lista"
                                    onClick={() => removerElemento(object.archivoid)}
                                    >
                                    <i className="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>


            

            
        </>
    );
};

export default SubListaDelete;