import React from 'react'

export const TableBlog = ({children, cabecera}) => {
    return (
        <>
           <table className="table table-striped  " id="dataTable">
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
