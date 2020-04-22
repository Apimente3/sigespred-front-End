import React, {useState, useEffect, useRef} from 'react';
import ModalSearchCad from "../solicitudes/ModalSearchCAD";
const {L} = window;




const PolygonPredio = ({}) => {


    
    useEffect(() => {
        createMapa()
    }, []);



   


    

    return (
        <>

            <div>
                <div className="form-group">
                    <label className="col-lg-1 control-label"><span
                        className="obligatorio">* </span> Polygono del Predio</label>
                    <div id="map" className="col-lg-10 mapa-solicitud">

                    </div>
                </div>

                <div className="form-group">

                    <div className="col-lg-8">


                      
                        <div className="form-group ">


                            <label className="col-lg-5 control-label"> Buscar </label>
                            <div className="col-lg-5">
                                <a href="#popup1" type="file" className="btn btn-default btn-sm">
                                    Buscar en Base Grafica CAD
                                </a>
                            </div>

                        </div>


                    </div>


                </div>

            </div>
            <ModalSearchCad/>

        </>
    );
};

export default PolygonPredio;


function createMapa() {

    var mymap = L.map('map').setView([-9.492, -73.037], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Direccion de Disponibilidad de Predios`,
        id: 'mapbox.streets'
    }).addTo(mymap);

    window.MAP_DDP = mymap;

}