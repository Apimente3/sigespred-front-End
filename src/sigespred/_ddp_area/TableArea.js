import React from 'react';
import {Link} from "react-router-dom";

const TableArea = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped" id="dataTableArea">
                <thead>
                <tr>
                    { cabecera.map((cabeza,i)=>(
                        <th key={i}>{cabeza}</th>
                    ))
                    }
                </tr>
                </thead>
                <tbody>

                {children}


                </tbody>
            </table>

        </>
    );
};

export default TableArea;