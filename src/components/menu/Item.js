import React from 'react';
import { Link } from "react-router-dom";
const {$}=window;

const Item = ({title,subLinks,img}) => {
    return (
        <>
            <li className="openable open">
                <a href="#" className="hrefMenu textmenu-principal" title={title}>
								<span className="menu-icon">
								    <img src={img} className="btn-siderbar" ></img>
								</span>
                    <span className="text color-red"> {title}  </span>
                    <span className="menu-hover"></span>
                </a>
                <ul className="submenu">
                    { subLinks.map((subLink,i)=>(
                        <li id={subLink.to}><Link to={subLink.to}><span className="submenu-label">{subLink.denominacion}</span></Link></li>
                    ))}
                </ul>
            </li>
        </>
    );
};

export default Item;