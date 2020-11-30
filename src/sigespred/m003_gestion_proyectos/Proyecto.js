import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./styles.css"

import {serverFile} from "../../config/axios";

const Proyecto = ({proyecto}) => {

    const {codigo, icono, tipo_infraestructura, descripcion,portada_imagen,fecha_creacion} = proyecto;



    return (

        <div className="col-lg-4">

            <div className="card ">
                <div className="image-wrapper">
                <img  src={portada_imagen?serverFile+portada_imagen:'/img/no-item.png'} alt="Avatar"  style={{height:'300px',width:'100%'}}/>


                    <div className="image-overlay">
                    <div className="image-info">

                        <Link to={"/planos"}>
                        <div className="h3 leter-white">{descripcion}</div> </Link>

                        <span></span>
                        <div className="image-time">{fecha_creacion}</div>
                        <div className="image-like">


                        </div>
                    </div>

                </div>
                </div>
                    <div className="" style={{wordWrap: 'break-word',padding:'20px'}}>

                        <h4 title={codigo} ><a dangerouslySetInnerHTML={{__html: icono}}></a><b > {codigo}</b></h4>
                      <h4>{tipo_infraestructura}</h4>
                        <div className="h6" title={descripcion}>{descripcion.substring(0,35) +'...'}</div>
                        <Link to={"/planos"} className="btn btn-danger block" ><i
                            className="fa fa-sign-in" aria-hidden="true"></i> INGRESAR A PROYECTO</Link>
                    </div>
            </div>


        </div>


    );

}

export default Proyecto;