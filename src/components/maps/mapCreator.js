const {L, shp} = window;

var input = document.createElement("input");
input.setAttribute("type", "file");
input.setAttribute("id", "uploadShapeSubmit");
document.body.appendChild(input);
input.setAttribute("style", "display: none;");
input.addEventListener('change', subir, false);


export function createMapa() {

    var mymap = L.map('map').setView([-9.492, -73.037], 5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Direccion de Disponibilidad de Predios`,
        id: 'mapbox.streets'
    }).addTo(mymap);

    window.MAP_DDP = mymap;

}

export async function cargarShape(fn) {
    input.setAttribute("style", "display: inline;");

    setTimeout(function () {
        input.click();
    }, 1000)

}

export function subir(input) {

    var files = input.files;
    if (files.length == 0) {
        return; //do nothing if no file given yet
    }
    var file = files[0];
    if (file.name.slice(-3) != 'zip') { //Demo only tested for .zip. All others, return.
        throw {
            error: new Error(" Ingrese un archivo Shape Zipeado "),
            message: "Ingrese un archivo ShapeFile Zipeado",
            status: 401
        }
    } else {
        //  document.getElementById('warning').innerHTML = ''; //clear warning message.
        return handleZipFile(file);
    }
};

//More info: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
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

function convertToLayer(buffer) {
    return shp(buffer).then(function (geojson) {	//More info: https://github.com/calvinmetcalf/shapefile-js
        var layer = L.shapefile(geojson, {
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                        return k + ": " + feature.properties[k];
                    }).join("<br />"), {
                        maxHeight: 200
                    });
                }
            }
        }).addTo(window.MAP_DDP);//More info: https://github.com/calvinmetcalf/leaflet.shapefile

        window.MAP_DDP.fitBounds(layer.getBounds());
        return {layer: layer, geojson: layer.toGeoJSON()};

    });
}