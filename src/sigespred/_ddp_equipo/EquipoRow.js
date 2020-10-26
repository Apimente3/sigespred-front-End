import React from 'react';
import {Link} from "react-router-dom";

const EquipoRow = ({item}) => {

    return (
        <>
            <tr key={item.id}>
            {Object.values(item).map((val) => (
                <td>{val}</td>
            ))}
            </tr>
        </>
    );
};

export default EquipoRow;