import React from 'react';
import Header from "../../m000_common/headers/Header";
import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import PolygonPredio from "./PolygonPredio";
const pred_polygon={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-80.39297103881836,-3.544261506718567],[-80.38455963134766,-3.552485456394915],[-80.38387298583983,-3.551543132542062],[-80.38241386413574,-3.5532564479225104],[-80.37443161010742,-3.562850955218371],[-80.37271499633788,-3.5619943068444115],[-80.3730583190918,-3.5613089875711865],[-80.38138389587402,-3.551114803200039],[-80.38902282714844,-3.5408348394316587],[-80.39297103881836,-3.544261506718567]]]}}]}
const proy_polygon={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-80.38747787475585,-3.5447755057170967],[-80.38516044616699,-3.5472598301824894],[-80.38447380065918,-3.5465744999622535],[-80.38601875305176,-3.5437475074344373],[-80.38747787475585,-3.5447755057170967]]]}}]}

const PolygonoPredio = ({match}) => {
    const proyecto=JSON.parse(localStorage.getItem("PROYECTO_CURRENT"))
    const {codigo} = match.params;
    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <form>
                <div className="container mtop-20">
                    <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-body">
                            
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext">POLIGONO DEL PREDIO</legend>
                            </fieldset>
                          
                             <PolygonPredio proy_polygon={proy_polygon} pred_polygon={pred_polygon}/>
                           
                           
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default PolygonoPredio;