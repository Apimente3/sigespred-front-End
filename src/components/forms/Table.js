import React from 'react';
import {Link} from "react-router-dom";

const Table = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped" id="dataTable">
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




export default Table;