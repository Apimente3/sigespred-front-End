import React, {useEffect, useState} from 'react';
import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import Header from "../../m000_common/headers/Header";
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors} from "../../../config/axios";
import {tipovias_global,tipourbanizacion_global} from "../../../config/parameters";

const Axios = initAxiosInterceptors();



async function getPredio(codigo) {
    const {data} = await Axios.get(`/obtenerPredio/${codigo}`);
    return data;
}

async function getDatos_predio(predio_id) {
    const {data} = await Axios.get(`/datosgenerales/${predio_id}`);
    return data;
}

async function obtener_ubicacion_predio(predio_id) {
    const {data} = await Axios.get(`/obtener_ubicacion_predio/${predio_id}`);
    return data;
}


async function obtenerUbigeo() {
    const {data} = await Axios.get(`/ubigeo`);
    return data;
}

async function save_ubicacion_predio(ubicacion_predio) {
    const {data} = await Axios.post(`/save_ubicacion_predio`, ubicacion_predio);
    return data;
}


var ubigeo_global={};


const UbicacionPredio = ({match}) => {
    const {codigo} = match.params;

    const [predio, setPredio] = useState({});
    const [datos_predio, set_datos_predio] = useState({});
    const [ubicacion_predio, set_ubicacion_predio] = useState({});
    const [departamentos, set_departamentos] = useState([]);
    const [provincias, set_provincias] = useState([]);
    const [distritos, set_distritos] = useState([]);


    useEffect(() => {

        async function initialLoad() {
            try {
                const rpredio = await getPredio(codigo);
                setPredio(rpredio);
                
                const rdatos_predio=await getDatos_predio(rpredio.id);
                set_datos_predio(rdatos_predio);
                
                const rpredioubicacion_predio=await obtener_ubicacion_predio(rpredio.id);
                set_ubicacion_predio(rpredioubicacion_predio);
                
                const rubigeo=await obtenerUbigeo();
                ubigeo_global=rubigeo;
                set_departamentos(rubigeo.departamentos)
                set_provincias(rubigeo.provincias)
                set_distritos(rubigeo.distritos)
                
              
               
            } catch (error) {
                console.log(error);
            }
        }

        initialLoad();

    }, []);
    
    /**/

    function handleInputChange(e) {

        set_ubicacion_predio({
            ...ubicacion_predio,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }    
    
    /*Filter Procincias*/
    function filterProv(dep) {
      set_provincias( ubigeo_global.provincias.filter(prov => prov.departamento==dep)) ;
    }

    function filterDistrito(provincia) {
       
        set_distritos( ubigeo_global.distritos.filter(dist => dist.provincia==provincia)) ;
    }
    
    const guardar=async (e)=>{
        e.preventDefault();
        try {
            if(ubicacion_predio.departamento=="0" || !ubicacion_predio.departamento){
                toastr.error('Seleccione el DEPARTAMENTO');
                return;
            }
            if(ubicacion_predio.provincia=="0" || !ubicacion_predio.provincia){
                toastr.error('Seleccione el PROVINCIA');
                return;
            }

            if(ubicacion_predio.distrito=="0" || !ubicacion_predio.distrito){
                toastr.error('Seleccione el DISTRITO');
                return;
            }

            if(ubicacion_predio.tipovia=="0" || !ubicacion_predio.tipovia){
                toastr.error('Seleccione el TIPO DE VIA');
                return;
            }

            if(ubicacion_predio.tipourbanizacion=="0" || !ubicacion_predio.tipourbanizacion){
                toastr.error('Seleccione el TIPO DE URBANIZACION');
                return;
            }
            
            const response = await save_ubicacion_predio({...ubicacion_predio,predio_id:predio.id})
            toastr.info('Correctamente Actualizado')
        } catch (e) {
            console.log(e)
            toastr.error('Ocurrio un Error.')
        }
    }
    
    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <form>
                <div className="container mtop-20">

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext">UBICACIÓN DEL PREDIO</legend>
                            </fieldset>
                            <form onSubmit={guardar}>
                            <div>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Departamento</label>
                                    <div className="col-lg-2">
                                        <select

                                            className="form-control input-sm"
                                            name="departamento"
                                            onChange={ e=>{  handleInputChange(e);  filterProv(e.target.value)}}
                                            value={ubicacion_predio.departamento}

                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            { departamentos.map(dep=>(
                                                <option value={dep.id}>{dep.departamento}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Provincia</label>
                                    <div className="col-lg-2">
                                        <select

                                            className="form-control input-sm"
                                            name="provincia"
                                            onChange={ e=>{  handleInputChange(e);  filterDistrito(e.target.value)}}
                                            value={ubicacion_predio.provincia}

                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            { provincias.map(prov=>(
                                                <option value={prov.id}>{prov.provincia}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span>Distrito</label>
                                    <div className="col-lg-3">
                                        <select

                                            className="form-control input-sm"
                                            name="distrito"
                                            onChange={ handleInputChange}
                                            value={ubicacion_predio.distrito}

                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            { distritos.map(dist=>(
                                                <option value={dist.distrito}>{dist.distrito}</option>
                                            ))}


                                        </select>
                                    </div>


                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Unidad Catastral</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="unidad_catastral"
                                               onChange={ handleInputChange}
                                               value={ubicacion_predio.unidad_catastral}
                                        ></input>
                                    </div>
                                    
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span>Sector</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="sector"
                                               onChange={ handleInputChange}
                                               value={ubicacion_predio.sector}
                                        ></input>
                                    </div>


                                </div>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Tipo Via</label>
                                    <div className="col-lg-2">
                                        <select

                                            className="form-control input-sm"
                                            name="tipovia"
                                            onChange={handleInputChange}
                                            value={ubicacion_predio.tipovia}

                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            { tipovias_global.map(tipovia=>(
                                                <option value={tipovia.tipovia}>{tipovia.tipovia}</option>
                                            ))}


                                        </select>
                                    </div>

                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Via</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"
                                               name="via"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.via}
                                        ></input>
                                    </div>

                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Cuadra</label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"
                                               name="cuadra"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.cuadra}
                                        ></input>
                                    </div>

                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Nro</label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"
                                               name="nro"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.nro}
                                        ></input>
                                    </div>




                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Tipo Urb.</label>
                                    <div className="col-lg-2">
                                        <select

                                            className="form-control input-sm"
                                            name="tipourbanizacion"
                                            onChange={handleInputChange}
                                            value={ubicacion_predio.tipourbanizacion}

                                        >
                                            <option value="0">-- SELECCIONE --</option>
                                            { tipourbanizacion_global.map(tipourb=>(
                                                <option value={tipourb.tipourbanizacion}>{tipourb.tipourbanizacion}</option>
                                            ))}


                                        </select>
                                    </div>

                                    <label className="col-lg-1 control-label" title="Urbanización"><span
                                        className="obligatorio">* </span> Urb</label>
                                    <div className="col-lg-2">
                                        <input required className="form-control input-sm" type="text"
                                               name="urbanizacion"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.urbanizacion}
                                        ></input>
                                    </div>

                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Manzana</label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"
                                               name="manzana"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.manzana}
                                        ></input>
                                    </div>

                                    <label className="col-lg-1 control-label"><span
                                        className="obligatorio">* </span> Lote</label>
                                    <div className="col-lg-1">
                                        <input required className="form-control input-sm" type="text"
                                               name="lote"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.lote}
                                        ></input>
                                    </div>




                                </div>


                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Kilometro</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="km"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.km}
                                        ></input>
                                    </div>

                                    <label className="col-lg-2 control-label" title=""><span
                                        className="obligatorio">* </span> Centro Poblado</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="centro_poblado"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.centro_poblado}
                                        ></input>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Valle</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="valle"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.valle}
                                        ></input>
                                    </div>

                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> Referencia</label>
                                    <div className="col-lg-4">
                                        <input required className="form-control input-sm" type="text"
                                               name="referencia"
                                               onChange={handleInputChange}
                                               value={ubicacion_predio.referencia}
                                        ></input>
                                    </div>


                                </div>
                               
                               
                                
                              
                                <div className="panel-body">
                                    <div className="form-group ">
                                        <div className="col-lg-offset-10 col-lg-12">
                                            <button id="btnguardar" type="submit"
                                                    className="btn btn-danger btn-sm btn-control">

                                                Guardar
                                            </button>


                                        </div>

                                    </div>

                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UbicacionPredio;