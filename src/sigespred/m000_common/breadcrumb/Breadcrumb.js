import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumb = ({listbreadcrumb}) => {
    return (
        <>
            <div id="breadcrumb">
                <ul className="breadcrumb">
                    { listbreadcrumb.map((bread,i)=>(
                        <li key={i}><Link to={bread.link} href="#" key={i}> {bread.name}</Link></li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Breadcrumb;