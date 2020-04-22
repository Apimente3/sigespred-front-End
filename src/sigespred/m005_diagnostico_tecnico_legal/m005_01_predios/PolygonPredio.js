import React, {useState, useEffect, useRef} from 'react';
import fullScreen from '../../../libraries/Leaflet.fullscreen/dist/Leaflet.fullscreen';
import '../../../libraries/Leaflet.fullscreen/dist/leaflet.fullscreen.css'; 
import Map from "../../../components/helpers/maps/MapProyecto";
import './leyenda.css'

const {L} = window;
fullScreen(L);

var mapa=null;
let proyecto=JSON.parse(localStorage.getItem('PROYECTO_CURRENT'));
//  alert(JSON.stringify(proyecto))
if(proyecto){
    proyecto=proyecto[0]
}else{
    proyecto={} 
}
let predio=JSON.parse(localStorage.getItem('PREDIO_CURRENT')); //localStorage.PREDIO_CURRENT;

const PolygonPredio = ({proy_polygon, pred_polygon}) => {

 
    
    useEffect(() => {
        createMapa(proy_polygon, pred_polygon);
        return function () {
            if (mapa && mapa.remove) {
                mapa.off();
                mapa.remove();
            }
        }
    }, []);

    return (
        <>

            <div id="map" className="col-lg-12 mapa-solicitud">
            </div>


        </>
    );
};

export default PolygonPredio;

/**/
function createMapa(proy_polygon, pred_polygon) {
    

    
    var mymap = L.map('map', {
        fullscreenControl: true,
    }).setView([-9.492, -73.037], 5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Direccion de Disponibilidad de Predios`,
        id: 'mapbox.streets'
    }).addTo(mymap);
    window.MAP_DDP = mymap;


    let lgeojson = L.geoJson(proyecto.polygonojson, {
        style: {
            weight: 2,
            opacity: 1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0.1,
            fillColor: 'blue'
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
    }).addTo(mymap);


    //mymap.fitBounds(lgeojson.getBounds())


    let lgeojson2 = L.geoJson(predio.polygonojson, {
        style: {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0.1,
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
    }).addTo(mymap);

    createLeyenda(mymap);
    mapa=mymap
    mymap.fitBounds(lgeojson2.getBounds())
}

function createLeyenda(map) {

    /*Legend specific*/
    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
        <h4>LEYENDA</h4>
        <i style="background: #477AC2"></i><span><b>PROYECTO :</b> ${proyecto.descripcion} -  ${proyecto.tipo_infraestructura}</span><br>
        <i style="background: red"></i><span><b>PREDIO :</b> ${predio.codigo} </span><br>
        
`
      



        return div;
    };

    legend.addTo(map);
    
}