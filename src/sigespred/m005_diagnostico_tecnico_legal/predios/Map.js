import React, {useState, useEffect, useRef} from 'react';
import {obtener} from "../../../actions/trabajador/Actions";
import {createMapa, subir} from './mapCreator'
import ReduxToastr from "react-redux-toastr";




const Map = ({setLayerMapchild,toastr}) => {


    useEffect(() => {
        createMapa()
    }, []);

    const abrirShape = async (e) => {
        try {
            e.preventDefault();
            const layer = await subir(e.target);
            setLayerMapchild(layer)
            toastr.info ('¡ Correcto !','Se subio correctamente la POLYGONAL',{  position: 'top-right'})
        }catch ({message}) {

            toastr.error('¡ ERROR !',message)
        }
    }

    return (
        <div>
            <div>
                <div className="form-group">

                    <div id="map" className="col-lg-10 mapa-solicitud">

                    </div>
                </div>
                <div className="form-group">

                    <div className="col-lg-8">


                        <input onChange={abrirShape} type="file" className="btn btn-default btn-sm"/>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Map;