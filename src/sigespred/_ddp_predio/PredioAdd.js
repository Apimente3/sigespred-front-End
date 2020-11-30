import React, {useEffect, useRef, useState,useCallback,useMemo} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer,GeoJSON, Marker, Popup, useMap} from 'react-leaflet';

import UploadGeo from '../../components/uploadgeo/UploadGeo';

import {initAxiosInterceptors} from '../../config/axios';
import { REGISTRO_PREDIOS_BREADCRUM } from "../../config/breadcrums";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {
    Form,
    FormGroup,
    Row6,
    Row12,
    RowForm,
    Select,
    Input,
    Options,
    FormControl,
    InputInline,
    FormFooter
} from "../../components/forms";
import {useForm} from "../../hooks/useForm"
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptions from "../../components/helpers/ComboOptions";
import MapRegistroPredio from "../../components/helpers/maps/MapRegistroPredio";
import SingleUpload from "../../components/uploader/SingleUpload";
import {FilesGestionPredial} from "../../config/parameters";

const {$} = window;
const Axios = initAxiosInterceptors();


const center = [51.505, -0.09]
const zoom = 13


function DisplayPosition({ map,geojson,setGeom }) {

    console.log(geojson)
    if(geojson.features.length>1){
        toastr.error('¡ Error !', 'El poligono seleccionado posee más de 01 geometrias.', {position: 'top-right'})
        return null
    }else{

       // setGeom(geojson.features[0].geometry);
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
        let geometria=geojson.features[0].geometry;
        setGeom(geometria);
        console.log(geometria);
        toastr.info('Carga correcta', 'El poligono seleccionado es correcto.', {position: 'top-right'})
        return null
    }

}



const PredioAdd = ({history,  match}) => {
    const [predio, setPredio, handleInputChange, reset ] = useForm({},["tramo"]);
    const listaProyectos = useAsync(helperGets.helperGetListProyectos, []);
    const listaTipoPredio = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOPRED]);
    const listaDepartmento = useAsync(helperGets.helperGetListDepartamento, []);
    const listaProvincia = useAsync(helperGets.helperGetListProvincia,[]);
    const listaDistrito = useAsync(helperGets.helperGetListDistrito,[]);
    const [listaTramos, setListaTramos] = useState(null);
    const [dataProvincia, setDataProvincia] = useState(null);
    const [dataDisttrito, setDataDisttrito] = useState(null);
    /*add ESEO*/
    const [geometria, setGeometria] = useState(null);

    /*Map Eseo*/

    const [map, setMap] = useState(null)

    async function addPredio(predio) {
        const {data} = await Axios.post(`/predio`,predio);
        return data;
    }


    function handleChangeDepartmento(e) {
        if(!listaProvincia.loading){
            let data = listaProvincia.result;
            let provList = data[Object.keys(data)[0]].filter( o => o.id_dpto === e.target.value);
            setDataProvincia({data: provList});
            setDataDisttrito(null);
        }
    }

    function handleChangeProvincia(e) {
        if(!listaDistrito.loading){
            let data = listaDistrito.result;
            let distList = data[Object.keys(data)[0]].filter( o => o.id_prov === e.target.value);
            setDataDisttrito({data: distList});
        }
    }

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');

        try {
            let predioResult = await addPredio({...predio,geom:geometria});
            toastr.success('Registro de Predio', `Se generó el predio con código ${predioResult.codigopredio}.`);
            history.push('/predio-list');
        }
        catch (e) {
            toastr.error('Registro de Predio', "Se encontró un error: " +  e.message);
        }
        $('#btnguardar').button('reset');
    }

    const handleFiltrarChildrenProyecto = async(e) => {
        cargarChildrenProyecto(e.target.value);
    }

    const cargarChildrenProyecto = async(idProyecto) => {
        if (idProyecto) {
            let dataTramos = await helperGets.helperGetListTramos(idProyecto);
            setListaTramos(dataTramos);
        } else {
            setListaTramos(null);
        }
    }


    /*Add eseo*/
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
        <WraperLarge titleForm={"Registro de Predio Individualizado (Generación de Código)"} listbreadcrumb={REGISTRO_PREDIOS_BREADCRUM} >
        <Form onSubmit={registrar}>
                <div className="row mleft-5">
                    <div className="form-group col-lg-4 mleft-5">

                            <div>
                                <label className="control-label">
                                    <span className="obligatorio">* </span> Proyecto:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.gestionpredialid || ""}
                                            onChange={(e) => {handleFiltrarChildrenProyecto(e); handleInputChange(e);}}
                                        name={"gestionpredialid"}>
                                    {listaProyectos.result?
                                    <ComboOptions data={listaProyectos.result} valorkey="id" valornombre="denominacion"/>
                                    : "Cargando..."}
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Sector / Tramo:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select value={predio.tramoid || ""} required={true}
                                        onChange={handleInputChange}
                                        name={"tramoid"}>
                                    <ComboOptions data={listaTramos} valorkey="id" valornombre="descripcion" />
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                    Sub-sector / Sub-tramo:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Input value={predio.subtramo || ""} onChange={handleInputChange}
                                        name={"subtramo"} placeholder={"Ingrese el sub-sector o sub-tramo"}
                                        type={"text"}>
                                </Input>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Tipo de Predio:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.tipopredioid || ""}
                                            onChange={handleInputChange}
                                        name={"tipopredioid"}>
                                    {listaTipoPredio.result?
                                    <ComboOptions data={listaTipoPredio.result} valorkey="id" valornombre="valortexto"/>
                                    : "Cargando..."}
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Departamento:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.departamentoid || ""}
                                    onChange={(e) => {handleChangeDepartmento(e); handleInputChange(e);}}
                                    name={"departamentoid"}>
                                    {listaDepartmento.result?
                                    <ComboOptions data={listaDepartmento.result} valorkey="id_dpto" valornombre="nombre"/>
                                    : "Cargando..."}
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Provincia:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.provinciaid || ""}
                                    onChange={(e) => {handleChangeProvincia(e); handleInputChange(e);}}
                                    name={"provinciaid"}>
                                    <ComboOptions data={dataProvincia} valorkey="id_prov" valornombre="nombre" />
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                <span className="obligatorio">* </span> Distrito:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <Select required={true} value={predio.distritoid || ""}
                                            onChange={handleInputChange}
                                        name={"distritoid"}>
                                    <ComboOptions data={dataDisttrito} valorkey="id_dist" valornombre="nombre" />
                                </Select>
                            </div>
                            <div className="mtop-5">
                                <label className="control-label">
                                Archivo con Geometria del Predio:
                                </label>
                            </div>
                            <div className="mtop-5">
                                <UploadGeo form={predio} setForm={setPredio} nameUpload={"geojson"} ></UploadGeo>
                            </div>
                            <div className="mtop-35 pull-right">
                                <Link to={`/predio-list`}
                                className="btn btn-default btn-sm btn-control">Cancelar</Link>
                                <button id="btnguardar"
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                            </div>

                    </div>
                    <div className="col-lg-8 mright-5">
                        {predio.geojson ? <DisplayPosition setGeom={setGeometria} geojson={predio.geojson} map={map} /> : null}
                        {displayMap}
                    </div>
                </div>
                </Form>
        </WraperLarge>
    </>
  );
};

export default PredioAdd;