import React from 'react'

export const TableCategoria = ({children,cabecera}) => {
    return (
        <>
            <table className="table table-striped  " id="dataTableCategoria">
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
    )
}
