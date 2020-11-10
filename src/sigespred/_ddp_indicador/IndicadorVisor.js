import React, {useState, useEffect} from 'react';
import {REGISTRO_INDICADERES_BREADCRUM as breadcrum} from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";
import {

    FormFooter,RowForm,Row12
} from "../../components/forms";

import Iframe from 'react-iframe'

import SingleUpload from "../../components/uploader/SingleUpload";

import {useForm} from "../../hooks/useForm"
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import {FilesIndicador} from "../../config/parameters";
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

    /*Valiables Globales*/
    useEffect(() => {
        const init = async () => {
            setIndicador(await getIndicador(id));
        };
        init();
    }, []);




    return (
        <Wraper titleForm={`Visualizador de Indicador: ${indicador.denominacion}`} listbreadcrumb={breadcrum}>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={indicador.urlpbi}
                        allowFullScreen></iframe>

            </div>
        </Wraper>
    );

}


export default IndicadorVisor;
