import React from 'react';
import {Link} from "react-router-dom";

const TablePlano = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped" id="dataTable">
                <thead key="thhead_plano">
                <tr key="thhead_tr_plano">
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

export default TablePlano;