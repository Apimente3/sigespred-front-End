import React, {Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import {selectProyecto} from '../../utils';
import "./styles.css"

import {serverFile} from "../../config/axios";


const Proyecto = ({proyecto}) => {

    console.log('/*Mostrar proyecto*/')
    console.log(proyecto)
   let  proyecto_seleccionado = proyecto;
    const {codigo, icono, tipo_infraestructura, descripcion, portada_imagen, fecha_creacion} = proyecto;
    let history = useHistory();
    var imagenFondo = '/img/no-item.png';

    if (proyecto.archivoimagen) {
        imagenFondo = serverFile + proyecto.archivoimagen.path;
    }

    const setProyectoSession = async (e) => {
        await selectProyecto(proyecto_seleccionado);
        history.push("/planos");

    }

    return (

        <div className="col-lg-4">

            <div className="card ">
                <div className="image-wrapper">
                    <img src={imagenFondo} alt="Avatar" style={{height: '300px', width: '100%'}}/>


                    <div className="image-overlay">
                        <div className="image-info">

                            <Link to={"/planos"}>
                                <div className="h3 leter-white">{descripcion}</div>
                            </Link>

                            <span></span>
                            <div className="image-time">{fecha_creacion}</div>
                            <div className="image-like">
                            </div>
                        </div>

                    </div>
                </div>
                <div className="" style={{wordWrap: 'break-word', padding: '20px'}}>
                    <h4 title={codigo}><a dangerouslySetInnerHTML={{__html: icono}}></a><b> {codigo}</b></h4>
                    <h4>{tipo_infraestructura}</h4>
                    <div className="h6 textmenu-principal" title={descripcion}>{descripcion}</div>
                    <a href="#" className="btn btn-danger block" onClick={setProyectoSession}><i
                        className="fa fa-sign-in" aria-hidden="true"></i> INGRESAR A PROYECTO</a>
                </div>
            </div>


        </div>


    );

}

export default Proyecto;