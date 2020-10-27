const { ReactComponent } = require("*.svg");

import React from 'react';

const TableArea = ({childeren,cabecera}) => {
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