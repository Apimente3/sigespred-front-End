import React, {useEffect, useRef, useState,useCallback,useMemo} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer,GeoJSON, Marker, Popup, useMap} from 'react-leaflet';

import UploadGeo from '../../components/uploadgeo/UploadGeo';
import {useForm} from "../../hooks/useForm"
import {toastr} from "react-redux-toastr";

const center = [51.505, -0.09]
const zoom = 13


function DisplayPosition({ map,geojson,bounds }) {

console.log(geojson)
  if(geojson.features.length>1){
      toastr.error('¡ Error !', 'El poligono seleccionado posee más de 01 geometrias.', {position: 'top-right'})
      return null
  }else{
      let geojsonLayer= L.geoJson(geojson,{
          onEachFeature: function (feature, layer) {
              if (feature.properties) {
                  layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                      return k + ": " + feature.properties[k];
                  }).join("<br />"), {
                      maxHeight: 200
                  });
              }
          }
      }).addTo(map);

      map.fitBounds(geojsonLayer.getBounds());
      toastr.info('Carga correcta', 'El poligono seleccionado es correcto.', {position: 'top-right'})
      return null
  }

}


const Perfil = () => {

    const [form,setForm]=useForm()
    const [map, setMap] = useState(null)


    const displayMap = useMemo(
        () => (
            <MapContainer
                style={{width: "100%", heigth:"150"}}
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        [],
    )


    return (
        <>

            <div className="search-container">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="search-header">
                            <a href="#" className="h4 inline-block">Demo Map Uploader</a>

                        </div>
                        <div className="text-right">
                            <UploadGeo form={form} setForm={setForm} nameUpload={"geojson"} ></UploadGeo>

                        </div>
                        <p className="m-top-sm" style={{Width: "150px"}}>
                            {form.geojson ? <DisplayPosition geojson={form.geojson} map={map} /> : null}
                            {displayMap}
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Perfil;