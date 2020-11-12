import React from 'react';
import {Link} from "react-router-dom";

const TableTramo = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped" id="dataTable">
                <thead>
                <tr>
                    { cabecera.map((header,i)=>(
                        <th key={i}>{header}</th>
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

export default TableTramo;