import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer,GeoJSON, Marker, Popup } from 'react-leaflet';

import UploadGeo from '../../components/uploadgeo/UploadGeo';
import {useForm} from "../../hooks/useForm"

const Perfil = () => {

    const [form, setForm,handleInputChange, reset ] = useForm({archivos:[]});


    useEffect(() => {
        const init = async () => {
         console.log(form.geojson)


        };
        init();
    }, [form]);


    return (
        <>

            <div className="search-container">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="search-header">
                            <a href="#" className="h4 inline-block">Demo Map Uploader</a>
                            <div className="text-muted">www.someExample.com/search/blog</div>
                        </div>
                        <div className="text-right">

                            <UploadGeo form={form} setForm={setForm} nameUpload={"geojson"}></UploadGeo>

                        </div>
                        <p className="m-top-sm" style={{Width: "150px"}}>

                               {form.geojson ?
                                   <MapContainer style={{width: "100%", heigth:"250px"}} center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false}>
                                       <TileLayer
                                           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                       />

                                       <GeoJSON
                                           data={form.geojson }
                                           style={() => ({
                                               color: '#4a83ec',
                                               weight: 0.5,
                                               fillColor: "#1a1d62",
                                               fillOpacity: 1,
                                           })}
                                       />



                                   </MapContainer>
                                   :
                                   <MapContainer style={{width: "100%", heigth:"250px"}} center={[51.505, -0.09]} zoom={1} scrollWheelZoom={false}>
                                       <TileLayer
                                           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                       />

                                       <Marker position={[50, 10]}>
                                           <Popup>
                                               Popup for any custom information.
                                           </Popup>
                                       </Marker>
                                   </MapContainer>

                               }




                        </p>


                    </div>
                </div>
            </div>


        </>
    );
};

export default Perfil;