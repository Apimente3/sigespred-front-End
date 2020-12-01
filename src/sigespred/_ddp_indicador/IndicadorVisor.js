import React, {useState, useEffect} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {REGISTRO_INDICADERES_BREADCRUM as breadcrum} from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";


import {useForm} from "../../hooks/useForm"

import {initAxiosInterceptors} from '../../config/axios';

const Axios = initAxiosInterceptors();

const {$} = window;



async function getIndicador(id) {
   // alert(id)
    const {data} = await Axios.get(`/indicador/${id}`);
    return data;
}






const IndicadorVisor = ({match,history}) => {

    const {id}=match.params;

    /*Es necesario inicializar los valores por defecto */
    const [indicador, setIndicador,handleInputChange, reset ] = useForm({}, ['denominacion','descripcion']);
    const handle = useFullScreenHandle();

    /*Valiables Globales*/
    useEffect(() => {
        const init = async () => {
            setIndicador(await getIndicador(id));
        };
        init();
    }, []);




    return (
        <Wraper titleForm={`Visualizador de Indicador: ${indicador.denominacion}`} listbreadcrumb={breadcrum}>
            <button onClick={handle.enter} title="Mostrar pantalla completa.">
                <i className="fas fa-expand"></i>
            </button>
            <FullScreen handle={handle}>

                <div className="embed-responsive embed-responsive-16by9">

                    <iframe className="embed-responsive-item" src={indicador.urlpbi}
                            allowFullScreen></iframe>

                </div>
            </FullScreen>

        </Wraper>
    );

}


export default IndicadorVisor;
