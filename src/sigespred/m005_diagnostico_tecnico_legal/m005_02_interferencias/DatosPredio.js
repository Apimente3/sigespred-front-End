import React, {useEffect, useState} from 'react';
import SidebarPredios from "../../m000_common/siderbars/SidebarPredios";
import Header from "../../m000_common/headers/Header";
import {toastr} from "react-redux-toastr";
import {initAxiosInterceptors} from "../../../config/axios";


const Axios = initAxiosInterceptors();

async function getPredio(codigo) {
    const {data} = await Axios.get(`/obtenerPredio/${codigo}`);
    return data;
}

async function getDatos_predio(predio_id) {
    const {data} = await Axios.get(`/datosgenerales/${predio_id}`);
    return data;
}


async function save_datos_predio(datos_predio) {
    const {data} = await Axios.post(`/save_datos_predio`, datos_predio);
    return data;
}


const DatosPredio = ({match}) => {
    const {codigo} = match.params;
    const [predio, setPredio] = useState({});
    const [datos_predio, setDatos_predio] = useState({});

    useEffect(() => {

        async function initialLoad() {
            try {
                const rpredio = await getPredio(codigo)
                setPredio(rpredio);
              
                const rdatos_predio = await getDatos_predio(rpredio.id)
                
                setDatos_predio(rdatos_predio)
            } catch (error) {
                console.log(error);
            }
        }

        initialLoad();

    }, []);

    /*Funcion que actualiza el estado de datos del predio*/

    function handleInputChange(e) {

        setDatos_predio({
            ...datos_predio,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }


    const guardarDatosPredio = async (e) => {
        e.preventDefault();
        try {
            if(datos_predio.tipopredio_id==0){
                toastr.error('Seleccione el TIPO PREDIO');
                return;
            }
            const response = await save_datos_predio({...datos_predio,predio_id:predio.id})
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
                <div className="container mtop-20" >

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext">DATOS GENERALES DEL PREDIO</legend>
                            </fieldset>

                            <div>

                                <form onSubmit={guardarDatosPredio}>
                                    <div className="form-group">

                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Tipo de Predio</label>
                                        <div className="col-lg-10">
                                            <select

                                                className="form-control input-sm"
                                                name="tipopredio_id"
                                                onChange={handleInputChange}
                                                value={datos_predio.tipopredio_id}

                                            >
                                                <option value="0">-- SELECCIONE --</option>
                                                <option value="1">URBANO</option>
                                                <option value="2">RURAL</option>


                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Zonificación</label>
                                        <div className="col-lg-10">
                                            <input required className="form-control input-sm" type="text"
                                                   name="zonificacion"
                                          
                                                   onChange={handleInputChange}
                                                   value={datos_predio.zonificacion}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span>Uso Actual</label>
                                        <div className="col-lg-10">
                                            <input required className="form-control input-sm" type="text"
                                                   name="usoactual"
                                                   onChange={handleInputChange}
                                                   value={datos_predio.usoactual}
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

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DatosPredio;