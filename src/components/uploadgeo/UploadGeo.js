import React, {useState} from 'react';
import {toastr} from "react-redux-toastr";
import {handleZipFile} from "./shzip";
import {getextfromfilegeojson} from "./geojson";
import {getextfromfilekml} from "./kml";
import {getextfromfilegpx} from "./gpx";


const UploadGeo = ({form, setForm, nameUpload, funcioncallback = null, funcionObtenerInfo = null}) => {
    async  function EventUpload(e){
        try {
            var files = e.target.files;
            if (files.length == 0) {
                alert('No se ha seleccionado ningún archivo.');
                return; //do nothing if no file given yet
            }

            if (funcioncallback) {
                funcioncallback(e);
            }

            var file = files[0];
            let extension = file.name.split(".").pop();
            switch (extension) {
                case "zip":
                    let result= await handleZipFile(file);
                    setForm({...form,[nameUpload]: result});
                    toastr.info('¡ Correcto !', 'Se cargo correctamente el Shape Zipeado .zip', {position: 'top-right'})
                    if (funcionObtenerInfo) {
                        funcionObtenerInfo(result);
                    }
                    break;
                case "kml":
                    /*setForm({...form,[nameUpload]: await  getextfromfilekml(file)});
                    toastr.info('¡ Correcto !', 'Se cargo correctamente el .kml', {position: 'top-right'})*/
                    break;
                case "gpx":
                   /* setForm({...form,[nameUpload]: await getextfromfilegpx(file)});
                    toastr.info('¡ Correcto !', 'Se cargo correctamente el .gpx', {position: 'top-right'})*/
                    break;
                case "json":
                    /*setForm({...form,[nameUpload]: await getextfromfilegeojson(file)});
                    toastr.info('¡ Correcto !', 'Se cargo correctamente el .geojson', {position: 'top-right'})*/
                    break;
                default:
                    toastr.error('¡ Error !', 'Selecione un shape zipeado,kml o GPX', {position: 'top-right'})
                    break;
            }
        }catch (e) {
            toastr.error('¡ Error !', 'Ocurrio un error en la carga del archivo.', {position: 'top-right'})
        }
    }

    function reset() {
        setForm({...form,[nameUpload]: undefined});
    }

    return (
        <>
            <div className="upload-file">
                <label title="Seleccione un archivo Vectorial" data-title="Shape (ZIP), kml, GPX, GeoJson" htmlFor="upload-demo">
                    <span data-title="Ningún archivo seleccionado..."></span>
                </label>
                <input type="file" className="upload-demo" onChange={EventUpload} accept=".zip,.kml,.gpx,.json"/>
            </div>

        </>
    );
};

export default UploadGeo;