

export function getextfromfilegeojson(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        try {
            reader.onload = function () {
                if (reader.readyState != 2 || reader.error) {
                    return;
                } else {
                    let text = reader.result;
                    let geojson=JSON.parse(text)
                    resolve(geojson);
                }
            };
            reader.readAsText(file);
        }
        catch (e) {
            reject(e);
        }
    })
}

