import {combineReducers} from 'redux';
import planoReducers from './_planoReducers';
import trabajadorReducers from './trabajadorReducers';
import brigadaReducers from './brigadaReducers';
import equipoReducers from './equipoReducers';
import diagnosticoReducers from './diagnosticoReducers';
import {reducer as toastrReducer} from 'react-redux-toastr'
import prediosReducers from "./prediosReducers";
import sujetopasivoReducers from "./sujetopasivoReducers";
import proyectoReducers from "./proyectoReducers";
import expedienteReducers from "./expedienteReducers";
import variableReducers from "./_variableReducers";

export default combineReducers({
    plano: planoReducers,
    trabajador: trabajadorReducers,
    brigadista: brigadaReducers,
    equipo: equipoReducers,
    diagnostico: diagnosticoReducers,
    predio: prediosReducers,
    sujetopasivo: sujetopasivoReducers,
    proyecto: proyectoReducers,
    expediente: expedienteReducers,
    variable : variableReducers,
    toastr: toastrReducer
});