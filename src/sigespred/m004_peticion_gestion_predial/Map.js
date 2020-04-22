import React, {useState, useEffect, useRef} from 'react';
import {obtener} from "../../../actions/trabajador/Actions";
import {createMapa, subir} from './mapCreator'
import ReduxToastr from "react-redux-toastr";
import ModalSearchCad from "./ModalSearchCAD";




const Map = ({setLayerMap, toastr}) => {

    const [loadMapa, SetLoadMapa] = useState(false);
    const [layerPolygon,setLayerPolygon]=useState(null);
    useEffect(() => {
        createMapa()
    }, []);

    const abrirShape = async (e) => {
        try {
            e.preventDefault();
            const {layer,geojson} = await subir(e.target);
            setLayerPolygon(layer);
            setLayerMap(geojson)
            toastr.info('¡ Correcto !', 'Se subio correctamente la POLYGONAL', {position: 'top-right'})
            SetLoadMapa(true);
        } catch ({message}) {

            toastr.error('¡ ERROR !', message)
        }
    }
    
    const LimpiarPolygono=()=>{

        window.MAP_DDP.removeLayer(layerPolygon);
        SetLoadMapa(false)
        
    }

    const SubidaShape = () => {
        return (<div className="form-group">

            <div className="col-lg-8">


                <div className="form-group " style={{display: 'none'}}>


                    <label className="col-lg-4 control-label">Subir ShapeFile ó</label>
                    <div className="col-lg-4">
                        <input onChange={abrirShape} type="file" className="btn btn-default btn-sm"/>
                    </div>

                </div>
              
                


            </div>


        </div>)
    }

    const Limpiar = () => {
        return <div className="form-group">
            <div className="col-lg-8">
            <center>
            <p>
                <button className="btn btn-sm btn-info" type="button"><i className="fa fa-save"></i> Guardar Polygono</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={LimpiarPolygono} className="btn btn-sm btn-danger" type="button"><i className="fa fa-close"></i> Limpiar Polygono</button>
            </p>

            </center>
            </div>
        </div>
    }

    return (
        <>

            <div>
                <div className="form-group">

                    <div id="map" className="col-lg-10 mapa-solicitud">

                    </div>
                </div>

                {!loadMapa ? SubidaShape() : Limpiar()}

            </div>
            <ModalSearchCad/>

        </>
    );
};

export default Map;