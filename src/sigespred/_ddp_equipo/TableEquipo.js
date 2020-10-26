import React from 'react';
import {Link} from "react-router-dom";

const TableEquipo = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped" id="dataTableEquipo">
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




export default TableEquipo;