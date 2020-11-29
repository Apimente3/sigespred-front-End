const {L, shp} = window;

/*
* Add ESEO
* Funcion que convierte un Shape Zipeado a un Objeto geojson
* */
export function handleZipFile(file) {

    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        try {
            reader.onload = function () {
                if (reader.readyState != 2 || reader.error) {
                    return;
                } else {
                    resolve(convertToLayer(reader.result));
                }
            }
            reader.readAsArrayBuffer(file);
        }
        catch (e) {
            reject(e);
        }
    })
}

/*Cvierte el buffer a shpa*/
function convertToLayer(buffer) {
    return shp(buffer).then(function (geojson) {	//More info: https://github.com/calvinmetcalf/shapefile-js
        return geojson;
    });
}