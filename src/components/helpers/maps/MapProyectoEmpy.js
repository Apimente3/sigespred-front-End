import React, {useState, useEffect, useRef} from 'react';


const {
    L
}
    = window;


export function createMapa() {

    var mymap = L.map('map').setView([-9.492, -73.037], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Direccion de Disponibilidad de Predios`,
        id: 'mapbox.streets'
    }).addTo(mymap);

    return mymap

}


const MapProyectoEmpy = ({}) => {

    //  alert(geojson)

    let Map = null;
    useEffect(() => {
        const init = async () => {
            Map = await createMapa();
        }
        init();
    }, []);

  
    return (
        <>

            <div>
                <div className="form-group">

                    <div id="map" className="col-lg-12 mapa-solicitud">

                    </div>
                </div>


            </div>


        </>
    );
};

export default MapProyectoEmpy;