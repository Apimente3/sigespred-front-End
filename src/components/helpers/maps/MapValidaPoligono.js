import React, {useState, useEffect, useRef} from 'react';


const {
    L
}
    = window;


export function createMapaMB() {

    var mymap = L.map('map').setView([-9.492, -73.037], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Direccion de Disponibilidad de Predios`,
        id: 'mapbox.streets'
    }).addTo(mymap);

    return mymap
}

export function createMapa() {

    var mymap = L.map('map',{     fullscreenControl: true}).setView([-9.492, -73.037], 5);

    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        maxNativeZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        label:"Google Satelite",
        attribution: `DDP`,
    }).addTo(mymap);

    return mymap

}

var mapa = null;
const MapValidaPoligono = ({}) => {

    //  alert(geojson)
    useEffect(() => {
        const init = async () => {
            mapa = await createMapa();
        }
        init();
    }, []);

  
    return (
        <>
            <div>
                <div id="map" className="col-lg-12 mapa-validapoligono">

                </div>
            </div>

        </>
    );
};

export default MapValidaPoligono;