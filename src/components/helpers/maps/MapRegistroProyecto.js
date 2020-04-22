import React, {useState, useEffect, useRef} from 'react';
import fullScreen from '../../../libraries/Leaflet.fullscreen/dist/Leaflet.fullscreen';
import '../../../libraries/Leaflet.fullscreen/dist/leaflet.fullscreen.css';

const {
    L
}
    = window;


export function createMapa() {

    var mymap = L.map('map',{     fullscreenControl: true}).setView([-9.492, -73.037], 5);

    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        maxNativeZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        label:"Google Satelite"
    }).addTo(mymap);

    return mymap

}

var mapa = null;
const MapRegistroProyecto = ({predios,geojson}) => {
    useEffect(() => {
        const init = async () => {
            mapa = await createMapa();
            if(geojson !== null){
                cargarLayer(geojson);
            }
        }


        init();
    }, []);

    const cargarLayer = async (geojson) => {

        console.log('***********',geojson)



        let lgeojson = await  L.geoJson(geojson, {
            style: {
                weight: 6,
                opacity: 1,
                color: 'red',
                dashArray: '3',
                fillOpacity: 0.1,
                fillColor: 'white'
            },
            onEachFeature: function (feature, layer) {


                if (feature.properties) {
                    layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                        return k + ": " + feature.properties[k];
                    }).join("<br />"), {
                        maxHeight: 200
                    });
                }
            }
        }).addTo(mapa);


        let lgeojson2 = await  L.geoJson(JSON.parse(localStorage.getItem('PROYECTO_CURRENT'))[0].polygonojson, {
            style: {
                weight: 2,
                opacity: 1,
                color: 'red',
                dashArray: '3',
                fillOpacity: 0.2,
                fillColor: 'red'
            },
            onEachFeature: function (feature, layer) {


                if (feature.properties) {
                    layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                        return k + ": " + feature.properties[k];
                    }).join("<br />"), {
                        maxHeight: 200
                    });
                }
            }
        }).addTo(mapa);



        mapa.fitBounds(lgeojson.getBounds())

    }


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

export default MapRegistroProyecto;