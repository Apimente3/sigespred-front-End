import React, {useState} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { EDICION_PREDIOS_BREADCRUM } from "../../config/breadcrums";
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
import PredioLinks from "./PredioLinks";
import {useDispatch} from 'react-redux';
import { actualizar } from '../../actions/_ddp_variable/Actions';

const {$} = window;
const Axios = initAxiosInterceptors();

const PredioEditReg = ({history,  match}) => {
    const {id} = match.params;
    const dispatch = useDispatch();
    const setIdPredioAccion = (variable) => dispatch(actualizar(variable));
    setIdPredioAccion(id);

    return (
        <>
            <WraperLarge listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
            <PredioLinks active="3"></PredioLinks>
                
            </WraperLarge>
        </>
  );
};

export default PredioEditReg;