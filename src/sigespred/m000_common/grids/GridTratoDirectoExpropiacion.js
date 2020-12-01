import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors,serverFile} from "../../../config/axios";
import {toastr} from "react-redux-toastr";
import ModalUploadFile from "../modals/ModalUploadFile";

const {$, jQuery, alasql} = window;

require("../grids/css.css")


//let $grid = $("#gridpropietario")
const initDateEdit = function (elem, options) {
    // we need get the value before changing the type
    var orgValue = $(elem).val(),
        cm = $(this).jqGrid("getColProp", options.name);

    $(elem).attr("type", "date");
    if ($(elem).prop("type") !== "date") {
        // if type="date" is not supported call jQuery UI datepicker
        $(elem).css({width: "8em"}).datepicker({
            dateFormat: "mm/dd/yy",
            autoSize: true,
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            showWeek: true
        });
    } else {
        // convert date to ISO
        $(elem).val($.jgrid.parseDate(cm.formatoptions.newformat, orgValue, "Y-m-d"))
            .css("width", "");
    }
};
const myBeforeSaveRow = function (options, rowid) {
    var $self = $(this), $dates = $("#" + $.jgrid.jqID(rowid)).find("input[type=date]");
    $dates.each(function () {
        var $this = $(this),
            id = $this.attr("id"),
            colName = id.substr(rowid.length + 1),
            cm = $self.jqGrid("getColProp", colName),
            str;
        if ($this.prop("type") === "date") {
            // convert from iso to newformat
            str = $.jgrid.parseDate("Y-m-d", $this.val(), cm.formatoptions.newformat);
            $this.attr("type", "text");
            $this.val(str);
        }
    });
};
const initDateSearch = function (elem) {

};
const numberTemplate = {
    formatter: "number", align: "right", sorttype: "number",
    editrules: {number: true, required: true},
    searchoptions: {sopt: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"]}
};

/*FUnciones de calculo de columnas*/
function calcValorComercial(cellvalue, options, rowObject) {
    var valorTerreno = parseFloat(options.rowData.val_comer_predio_valor_terreno || 0)
        , valorEdificacion = parseFloat(options.rowData.val_comer_predio_valor_edificacion || 0)
        , val_platanaciones = parseFloat(options.rowData.val_comer_predio_valor_plantaciones || 0);

    return (valorTerreno + valorEdificacion + val_platanaciones).toFixed(2);
}


const gridcolumnModel = [
    {
        "name": "id",
        "index": "id",
        "align": "left",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": true,
        "frozen": true
    },

    {
        "name": "expediente_codigo",
        "index": "expediente_codigo",
        "align": "left",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": false,
        "frozen": true,
        classes: 'datos_expediente_r'

    },

    {
        "name": "expediente_titulares",
        "index": "expediente_titulares",
        "align": "left",
        "width": 400,
        "editable": false,
        "search": false,
        "hidden": false,
        "frozen": true,
        classes: 'datos_expediente_r'
    },

    {
        "name": "dni_ruc",
        "index": "dni_ruc",
        "align": "left",
        "width": 180,
        "editable": false,
        "search": false,
        "hidden": false,
        "frozen": true,
        classes: 'datos_expediente_r'


    },

    {
        "name": "proyeccion_ejercicio",
        "index": "proyeccion_ejercicio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'inf_pred_afect_r'


    },

    {
        "name": "grupos",
        "index": "grupos",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'inf_pred_afect_r'
    },

    {
        "name": "clasificacion",
        "index": "clasificacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
    },

    {
        "name": "sector",
        "index": "sector",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
    },

    {
        "name": "inform_pred_denominacion_predio",
        "index": "inform_pred_denominacion_predio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
    },

    {
        "name": "inform_pred_naturaleza_predio",
        "index": "inform_pred_naturaleza_predio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
    },

    {
        "name": "inform_pred_p_e_predio",
        "index": "inform_pred_p_e_predio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
    },

    {
        "name": "inform_pred_area_inscrita_matriz_m",
        "index": "inform_pred_area_inscrita_matriz_m",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r',
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: " m2"}

    },

    {
        "name": "inform_pred_area_inscrita_matriz_ha",
        "index": "inform_pred_area_inscrita_matriz_ha",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'inf_pred_afect_r',
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 4, prefix: "", suffix: " ha"}
    },

    {
        "name": "inform_pred_area_directamente_afectada_m",
        "index": "inform_pred_area_directamente_afectada_m",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: " m2"}
    },

    {
        "name": "inform_pred_area_directamente_afectada_ha",
        "index": "inform_pred_area_directamente_afectada_ha",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 4, prefix: "", suffix: " ha"}
    },

    {
        "name": "inform_pred_area_indirectamente_afectada_m",
        "index": "inform_pred_area_indirectamente_afectada_m",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: " m2"}
    },

    {
        "name": "inform_pred_area_indirectamente_afectada_ha",
        "index": "inform_pred_area_indirectamente_afectada_ha",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 4, prefix: "", suffix: " ha"}
    },

    {
        "name": "inform_pred_area_remanente_m",
        "index": "inform_pred_area_remanente_m",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: " m2"}
    },

    {
        "name": "inform_pred_area_remanente_ha",
        "index": "inform_pred_area_remanente_ha",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 4, prefix: "", suffix: " ha"}
    },

    {
        "name": "inform_pred_area_adquirida_m",
        "index": "inform_pred_area_adquirida_m",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency'
        , formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: " m2"}
    },

    {
        "name": "inform_pred_area_adquirida_ha",
        "index": "inform_pred_area_adquirida_ha",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: 'currency'
        , formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 4, prefix: "", suffix: " ha"}
    },

    {
        "name": "inform_pred_tipoafectacion",
        "index": "inform_pred_tipoafectacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'inf_pred_afect_r'
        , formatter: "select",
        edittype: "select", editoptions: {value: "TOTAL:TOTAL;PARCIAL:PARCIAL", defaultValue: "TOTAL:TOTAL"}
    },

    {
        "name": "tipo_personeria",
        "index": "tipo_personeria",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'block_datos_1_r'
        , formatter: "select",
        edittype: "select", editoptions: {value: "NATURAL:NATURAL;JURIDICA:JURIDICA", defaultValue: "NATURAL:NATURAL"}
    },

    {
        "name": "condicion_juridica",
        "index": "condicion_juridica",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'block_datos_1_r'
    },

    {
        "name": "cajas",
        "index": "cajas",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'block_datos_1_r'
    },

    {
        "name": "comentarios",
        "index": "comentarios",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'block_datos_1_r'
    },

    {
        "name": "profesional_responsable",
        "index": "profesional_responsable",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'block_datos_1_r'
    },

    {
        "name": "cbc_sunarp_num_oficio",
        "index": "cbc_sunarp_num_oficio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "cbc_sunarp_fecha_presentacion",
        "index": "cbc_sunarp_fecha_presentacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "cbc_sunarp_en_sunarp",
        "index": "cbc_sunarp_en_sunarp",
        "align": "center",
        "width": 90,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_1_r'
    },

    {
        "name": "cbc_sunarp_fecha_expedicion",
        "index": "cbc_sunarp_fecha_expedicion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "cbc_sunarp_cbc_expedido",
        "index": "cbc_sunarp_cbc_expedido",
        "align": "left",
        "width": 120,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_1_r'
    },


    {
        "name": "ofic_comuni_num_oficio",
        "index": "ofic_comuni_num_oficio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "ofic_comuni_esnotificado",
        "index": "ofic_comuni_esnotificado",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
        , edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "ofic_comuni_fecha_notificacion",
        "index": "ofic_comuni_fecha_notificacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "anot_prevent_fecha_presentacion",
        "index": "anot_prevent_fecha_presentacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "anot_prevent_calificacion_sunarp",
        "index": "anot_prevent_calificacion_sunarp",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "anot_prevent_anotacion_inscrita",
        "index": "anot_prevent_anotacion_inscrita",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_1_r'
    },

    {
        "name": "gest_tasa_direc_nc_fecha_envio_dnc",
        "index": "gest_tasa_direc_nc_fecha_envio_dnc",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "gest_tasa_direc_nc_num_oficio_mtc",
        "index": "gest_tasa_direc_nc_num_oficio_mtc",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "gest_tasa_direc_nc_en_dnc",
        "index": "gest_tasa_direc_nc_en_dnc",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r',
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "gest_tasa_direc_nc_fecha_expedicion_tasacion",
        "index": "gest_tasa_direc_nc_fecha_expedicion_tasacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "gest_tasa_direc_nc_con_documento_tasacion_expedido",
        "index": "gest_tasa_direc_nc_con_documento_tasacion_expedido",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_1_r'
    },

    {
        "name": "interv_perito_perito",
        "index": "interv_perito_perito",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "interv_perito_fecha_informe",
        "index": "interv_perito_fecha_informe",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_1_r'
    },

    {
        "name": "interv_perito_informe_digital",
        "index": "interv_perito_informe_digital",
        "align": "left",
        "width": 200,
        "editable": false,
        formatter: function (cellvalue, options, rowObject) {

            //console.loo()
            let resultado='';
            if(!cellvalue){
                resultado=`<a href="#" onclick="window.showModalUplaodGrid(true,'${options.colModel.name}' ,'${rowObject.id}')" ><i row_id="${rowObject.id}"  class="fa fa-upload" aria-hidden="true"></i> Subir Archivo</a>`
            }else{
                resultado =`<a target="_blank" title="${cellvalue}" href="${serverFile +''+ cellvalue}"><i title="${cellvalue}" class="fa fa-download" aria-hidden="true"></i> Descargar</a> | <a href="#" onclick="window.showModalUplaodGrid(true,'${options.colModel.name}' ,'${rowObject.id}')" ><i row_id="${rowObject.id}"  class="fa fa-upload" aria-hidden="true"></i> Cambiar</a>`
            }
            return resultado;
        },
        "search": false,
        "hidden": false
        , classes: 'etapa_1_r'
    },

    {
        "name": "valor_informe_tasacion",
        "index": "valor_informe_tasacion",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        classes: 'etapa_1_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "cri_solicitado",
        "index": "cri_ solicitado ",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "cri_expedido",
        "index": "cri_expedido",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "para_publicacion",
        "index": "para_publicacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "doc_publicacion",
        "index": "doc_publicacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "certiticado_predupuestal_cp",
        "index": "certiticado_predupuestal_cp",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "certiticado_predupuestalnota_nro",
        "index": "certiticado_predupuestalnota_nro",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "certiticado_predupuestal_fecha",
        "index": "certiticado_predupuestal_fecha",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_2_r'
    },

    {
        "name": "remision_oficio_intension_remision_oficio_intension",
        "index": "remision_oficio_intension_remision_oficio_intension",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "remision_oficio_intension_nro_oficio_intension",
        "index": "remision_oficio_intension_nro_oficio_intension",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "remision_oficio_intension_fecha_entrega",
        "index": "remision_oficio_intension_fecha_entrega",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_2_r'
    },

    {
        "name": "com_suj_pasi_mtc_aceptacion",
        "index": "com_suj_pasi_mtc_aceptacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "com_suj_pasi_mtc_fecha_recepcion_comunicacion",
        "index": "com_suj_pasi_mtc_fecha_recepcion_comunicacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_2_r'
    },

    {
        "name": "com_suj_pasi_mtc_con_oposicion",
        "index": "com_suj_pasi_mtc_con_oposicion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "com_suj_pasi_mtc_entrega_anticipada",
        "index": "com_suj_pasi_mtc_entrega_anticipada",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "estado",
        "index": "estado",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select",
        editoptions: {value: ":NINGUNO;TRATO DIRECTO:TRATO DIRECTO;EXPROPIACION:EXPROPIACION;PAGO DE MEJORAS:PAGO DE MEJORAS;TRANSFERENCIAS INTERESTATALES:TRANSFERENCIAS INTERESTATALES"}
        ,
        classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_memo_ddp",
        "index": "gestion_rm_memo_ddp",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_memo_dgppt",
        "index": "gestion_rm_memo_dgppt",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_memo_envio_dgppt_dvt",
        "index": "gestion_rm_memo_envio_dgppt_dvt",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_memo_tiene_rm",
        "index": "gestion_rm_memo_tiene_rm",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        ,
        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_fecha_expedicion",
        "index": "gestion_rm_fecha_expedicion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_fecha_publicacion",
        "index": "gestion_rm_fecha_publicacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_2_r'
    },

    {
        "name": "gestion_rm_numero_resolucion",
        "index": "gestion_rm_numero_resolucion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_2_r'
    },

    {
        "name": "solicitud_devengado",
        "index": "solicitud_devengado",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'devengado_r'
    },

    {
        "name": "gestion_cheque_memo_finanzas_oga",
        "index": "gestion_cheque_memo_finanzas_oga",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_3_r'
    },

    {
        "name": "gestion_cheque_memo_finanzas_oga_digital",
        "index": "gestion_cheque_memo_finanzas_oga_digital",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
        , classes: 'etapa_3_r'
    },

    {
        "name": "gestion_cheque_fecha_memo",
        "index": "gestion_cheque_fecha_memo",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}
        , classes: 'etapa_3_r'
    },

    {
        "name": "gestion_cheque_modalidad_pago",
        "index": "gestion_cheque_modalidad_pago",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "gestion_cheque_nro_cheque_deposito_judicial",
        "index": "gestion_cheque_nro_cheque_deposito_judicial",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "legalizaciones_formulario_registral",
        "index": "legalizaciones_formulario_registral",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r',
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "legalizaciones_formulario_registral_digital",
        "index": "legalizaciones_formulario_registral_digital",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'

    },

    {
        "name": "legalizaciones_acta_entrega_terreno",
        "index": "legalizaciones_acta_entrega_terreno",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r',
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "legalizaciones_acta_entrega_terreno_digital",
        "index": "legalizaciones_acta_entrega_terreno_digital",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "legalizaciones_acta_de_fe_entrega_cheque_deposito",
        "index": "legalizaciones_acta_de_fe_entrega_cheque_deposito",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
        ,
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "legalizaciones_notaria_legalizaciones_fr",
        "index": "legalizaciones_notaria_legalizaciones_fr",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "fecha_pago_deposito",
        "index": "fecha_pago_deposito",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}, classes: 'etapa_3_r'
    },

    {
        "name": "monto_pagar",
        "index": "monto_pagar",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'etapa_3_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "pago_ejecutado",
        "index": "pago_ejecutado",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
        ,
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "gest_independ_inscrip_sunarp_nro_titulo",
        "index": "gest_independ_inscrip_sunarp_nro_titulo",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "gest_independ_inscrip_sunarp_fecha_solicitud",
        "index": "gest_independ_inscrip_sunarp_fecha_solicitud",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}, classes: 'etapa_3_r'
    },

    {
        "name": "gest_independ_inscrip_sunarp_fecha_inscripcion",
        "index": "gest_independ_inscrip_sunarp_fecha_inscripcion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}, classes: 'etapa_3_r'
    },

    {
        "name": "gest_independ_inscrip_sunarp_acto_inscrito_sunarp_favor_mtc",
        "index": "gest_independ_inscrip_sunarp_acto_inscrito_sunarp_favor_mtc",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "gest_independ_inscrip_sunarp_nueva_partida_registral",
        "index": "gest_independ_inscrip_sunarp_nueva_partida_registral",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita",
        "index": "gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
        ,
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
    },

    {
        "name": "gestion_entrega_recepcion_predio_ddp_opat_fecha_acta",
        "index": "gestion_entrega_recepcion_predio_ddp_opat_fecha_acta",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"},
        editoptions: {dataInit: initDateEdit}, classes: 'etapa_3_r'
    },

    {
        "name": "gestion_entrega_recepcion_predio_ddp_opat_representante_opat",
        "index": "gestion_entrega_recepcion_predio_ddp_opat_representante_opat",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "gestion_entrega_recepcion_predio_ddp_opat_representante_ddp",
        "index": "gestion_entrega_recepcion_predio_ddp_opat_representante_ddp",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "predios_en_arbitraje_en_arbitraje",
        "index": "predios_en_arbitraje_en_arbitraje",
        "align": "left",
        "width": 90,
        "editable": true,
        "search": false,
        "hidden": false,

        formatter: "select",
        edittype: "select", editoptions: {value: "SI:SI;NO:NO", defaultValue: "SI:SI"}
        , classes: 'etapa_3_r'
    },

    {
        "name": "predios_en_arbitraje_con_laudo_arbitral",
        "index": "predios_en_arbitraje_con_laudo_arbitral",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "predios_en_arbitraje_observaciones",
        "index": "predios_en_arbitraje_observaciones",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,

        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "expediente_finalizados_derivados_opat",
        "index": "expediente_finalizados_derivados_opat",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "expediente_finalizados_observaciones",
        "index": "expediente_finalizados_observaciones",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        edittype: 'textarea',
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "directorio",
        "index": "directorio",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        edittype: 'textarea',
        "hidden": false, classes: 'etapa_3_r'
    },

    {
        "name": "val_comer_predio_valor_terreno",
        "index": "val_comer_predio_valor_terreno",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "val_comer_predio_valor_edificacion",
        "index": "val_comer_predio_valor_edificacion",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "val_comer_predio_valor_plantaciones",
        "index": "val_comer_predio_valor_plantaciones",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "val_comer_predio_valor_comercial_vc",
        "index": "val_comer_predio_valor_comercial_vc",
        "align": "right",

        "width": 200,
        "editable": false,
        editoptions: {readonly: "readonly"},
        "search": false,
        "hidden": false,
        classes: 'val_terre_r_a'

        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "perjuicio_economico_lucro_cesante",
        "index": "perjuicio_economico_lucro_cesante",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "perjuicio_economico_danio_emergente",
        "index": "perjuicio_economico_danio_emergente",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "perjuicio_economico_valor_pe",
        "index": "perjuicio_economico_valor_pe",
        "align": "right",
        "width": 200,
        "editable": false,
        editoptions: {readonly: "readonly"},
        "search": false,
        "hidden": false,
        classes: 'val_terre_r_a'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "valor_segun_tasacion_vc_pe",
        "index": "valor_segun_tasacion_vc_pe",
        "align": "right",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r_b',
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "beneficio_veinte_ciento",
        "index": "beneficio_veinte_ciento",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r',
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "impuesto_a_la_renta",
        "index": "impuesto_a_la_renta",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        classes: 'val_terre_r',
        "hidden": false,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    },

    {
        "name": "valor_certificar",
        "index": "valor_certificar",
        "align": "right",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false,
        classes: 'val_terre_r'
        ,
        formatter: 'currency',
        formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. ", suffix: ""}
    }]
const gridcolNames = ["EXP. ID", "CODIGO DE EXPEDIENTE", "TITULARES ", "DNI/RUC", "PROYECCION 2019", "GRUPOS ", "CLASIFICACION", "SECTOR", "DENOMINACION DEL PREDIO"
    , "NATURALEZA DEL PREDIO", "P.E. PREDIO", "AREA INSCRITA MATRIZ  (M2)", "AREA INSCRITA  MATRIZ (HA)", "AREA  DIRECTAMENTE AFECTADA (M2)"
    , "AREA  DIRECTAMENTE AFECTADA (HAS)", "AREA INDIRECTAMENTE AFECTADA (M2)", "AREA INDIRECTAMENTE AFECTADA (HA)"
    , "AREA REMANENTE (M2)", "AREA REMANENTE (HA)", "AREA  ADQUIRIDA (M2)", "AREA  ADQUIRIDA (HA)", "TIPO DE AFECTACION DEL PREDIO"
    , "TIPO DE PERSONERIA", "CONDICION JURIDICA", "CAJAS", "COMENTARIOS", "PROFESIONAL RESPONSABLE ", "N° DE OFICIO", "FECHA DE PRESENTACION"
    , "EN SUNARP", "FECHA DE EXPEDICION", "CON CBC EXPEDIDO", "N° DE OFICIO", "NOTIFICADO", "FECHA DE NOTIFICACION", "FECHA DE PRESENTACION"
    , "EN CALIFICACION DE SUNARP", "ANOTACION INSCRITA", "FECHA DE ENVIO A LA DNC", "N° DE OFICIO MTC", "EN DNC", "FECHA DE  EXPEDICION DE TASACION"
    , "CON DOCUMENTO DE TASACION EXPEDIDO", "PERITO", "FECHA DE INFORME", "DIGITAL DEL INFORM.", "VALOR DE INFORME TASACION S/.", "SOLICITADO", "EXPEDIDO"
    , "PARA PUBLICACION", "DOCUMENTO PUBLICADO", "CON CP", "NOTA N° ", "FECHA", "REMISION DE OFICIO DE INTENSION", "N° DE OFICIO"
    , "FECHA DE ENTREGA", "ACEPTACION (SIN OPOSICIÓN)", "FECHA DE RECEPCION DE COMUNICACIÓN ", "CON OPOSICIÓN", "ENTREGA ANTICIPADA", "ESTADO"
    , "CON MEMO DDP", "MEMO DDP-DGPPT", "MEMO DE ENVIO DGPPT-DVT", "CON RM", "FECHA DE EXPEDICION RM", "FECHA DE PUBLICACION RM"
    , "NUMERO DE RESOLUCION", "SOLICITUD DEVENGADO ", "MEMO A FINANZAS / OGA", "MEMO A FINANZAS / OGA (Digital)", "FECHA DE MEMO", "MODALIDAD DE PAGO"
    , "gestion_cheque_nro_cheque_deposito_judicial", "FORMULARIO REGISTRAL", "FORMULARIO REGISTRAL (Digital)", "ACTA DE ENTREGA DE TERRENO"
    , "legalizaciones_acta_entrega_terreno_digital", "ACTA DE ENTREGA DE CHEQUE", "NOTARIA LEGALIZACION - F.R.", "FECHA PAGO /DEPOSITO", "MONTO A PAGAR S/."
    , "PAGO EJECUTADO", "N° DE TITULO", "FECHA DE SOLICITUD", "FECHA DE INSCRIPCION", "ACTO INSCRITO EN SUNARP - A FAVOR MTC", "NUEVA PARTIDA REGISTRAL"
    , "CON ACTA  SUSCRITA", "FECHA DE ACTA", "REPRESENTANTE DE OPAT", "REPRESENTANTE DDP", "EN ARBITRAJE", "CON LAUDO ARBITRAL", "OBSERVACIONES"
    , "DERIVADOS A OPAT", "OBSERVACIONES", "DIRECTORIO", "VALOR DE TERRENO S/.", "VALOR DE EDIFICACION S/.", "VALOR DE PLANTACIONES S/."
    , "VALOR COMERCIAL - VC S/", "LUCRO CESANTE S/.", "DAÑO EMERGENTE S/.", "VALOR PE S/.", "VALOR SEGÚN TASACION VC+PE", "BENEFICIO DEL 20%"
    , "IMPUESTO A LA RENTA (SUJ.PASV) ", "VALOR  A CERTIFICAR S/."]


const creteGrid = (gdata) => {
    let grid = $("#gridpropietario").jqGrid({
        datatype: "local",

        width: 500,
        height: 500,
        ignoreCase: true,
        //multiselect: false,
        styleUI: 'Bootstrap',
        colNames: gridcolNames,
        colModel: gridcolumnModel,
        pager: '#paperpropietario',
        //storname: 'idexpediente',
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: "10",
        //   ondblClickRow: setSessionProyecto,
//        rowList: [10, 20, 30],
        'cellEdit': true,
        'cellsubmit': 'clientArray',
        beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {
            try {


                var rowData = {...jQuery('#gridpropietario').jqGrid('getRowData', rowid), [cellname]: value};

                let listdata = []
                listdata.push(rowData)
                let datosCalculados = [{}]


                if (
                    cellname == 'val_comer_predio_valor_terreno'
                    || cellname == 'val_comer_predio_valor_edificacion'
                    || cellname == 'val_comer_predio_valor_plantaciones'
                    || cellname == 'perjuicio_economico_lucro_cesante'
                    || cellname == 'perjuicio_economico_danio_emergente'
                ) {

                    datosCalculados = alasql(`SELECT 
              CAST(val_comer_predio_valor_terreno AS NUMBER) + CAST(val_comer_predio_valor_edificacion as NUMBER) + CAST(val_comer_predio_valor_plantaciones as NUMBER)  as val_comer_predio_valor_comercial_vc
              ,CAST(perjuicio_economico_lucro_cesante AS NUMBER) + CAST(perjuicio_economico_danio_emergente as NUMBER)   as perjuicio_economico_valor_pe
              ,CAST(val_comer_predio_valor_terreno AS NUMBER) + CAST(val_comer_predio_valor_edificacion as NUMBER) + CAST(val_comer_predio_valor_plantaciones as NUMBER) + CAST(perjuicio_economico_lucro_cesante AS NUMBER) + CAST(perjuicio_economico_danio_emergente as NUMBER)  as valor_segun_tasacion_vc_pe
              ,(CAST(val_comer_predio_valor_terreno AS NUMBER) + CAST(val_comer_predio_valor_edificacion as NUMBER) + CAST(val_comer_predio_valor_plantaciones as NUMBER))*0.2  as beneficio_veinte_ciento
             
             
             , CAST(val_comer_predio_valor_terreno AS NUMBER) + CAST(val_comer_predio_valor_edificacion as NUMBER) + CAST(val_comer_predio_valor_plantaciones as NUMBER)+
              CAST(perjuicio_economico_lucro_cesante AS NUMBER) + CAST(perjuicio_economico_danio_emergente as NUMBER) +
             (CAST(val_comer_predio_valor_terreno AS NUMBER) + CAST(val_comer_predio_valor_edificacion as NUMBER) + CAST(val_comer_predio_valor_plantaciones as NUMBER))*0.2+
              CAST(impuesto_a_la_renta AS NUMBER)
              as valor_certificar
                  FROM ? `, [listdata]);

                }

                if (cellname == 'inform_pred_area_inscrita_matriz_m') {
                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_inscrita_matriz_m AS NUMBER)/10000  as inform_pred_area_inscrita_matriz_ha
                  FROM ? `, [listdata]);
                }

                if (cellname == 'inform_pred_area_inscrita_matriz_ha') {

                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_inscrita_matriz_ha AS NUMBER)*10000  as inform_pred_area_inscrita_matriz_m
                  FROM ? `, [listdata]);
                }


                if (cellname == 'inform_pred_area_directamente_afectada_m') {
                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_directamente_afectada_m AS NUMBER)/10000  as inform_pred_area_directamente_afectada_ha
                  FROM ? `, [listdata]);
                }

                if (cellname == 'inform_pred_area_directamente_afectada_ha') {

                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_directamente_afectada_ha AS NUMBER)*10000  as inform_pred_area_directamente_afectada_m
                  FROM ? `, [listdata]);
                }


                if (cellname == 'inform_pred_area_indirectamente_afectada_m') {
                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_indirectamente_afectada_m AS NUMBER)/10000  as inform_pred_area_indirectamente_afectada_ha
                  FROM ? `, [listdata]);
                }

                if (cellname == 'inform_pred_area_indirectamente_afectada_ha') {

                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_indirectamente_afectada_ha AS NUMBER)*10000  as inform_pred_area_indirectamente_afectada_m
                  FROM ? `, [listdata]);
                }


                if (cellname == 'inform_pred_area_remanente_m') {
                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_remanente_m AS NUMBER)/10000  as inform_pred_area_remanente_ha
                  FROM ? `, [listdata]);
                }

                if (cellname == 'inform_pred_area_remanente_ha') {

                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_remanente_ha AS NUMBER)*10000  as inform_pred_area_remanente_m
                  FROM ? `, [listdata]);
                }


                if (cellname == 'inform_pred_area_adquirida_m') {
                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_adquirida_m AS NUMBER)/10000  as inform_pred_area_adquirida_ha
                  FROM ? `, [listdata]);
                }

                if (cellname == 'inform_pred_area_adquirida_ha') {

                    datosCalculados = alasql(`SELECT 
                CAST(inform_pred_area_adquirida_ha AS NUMBER)*10000  as inform_pred_area_adquirida_m
                  FROM ? `, [listdata]);

                }

                console.log({...rowData, ...datosCalculados[0]})

                $('#gridpropietario').jqGrid('setRowData', iRow, {...rowData, ...datosCalculados[0]});

                 savechanges({[cellname]: value, ...datosCalculados[0], id: rowData.id});


               // savechanges({[cellname]: value, id: rowData.id});
                toastr.info('Se actualizó correctamente la tabla ', {"position": "bottom-center",});
            } catch (e) {
                toastr.info(JSON.stringify(e), {"position": "bottom-center",})
            }

        },


        afterSubmit: function (resp, postdata) {
            console.log(resp, postdata)

        },
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,


    });
    $("#gridpropietario").jqGrid("setFrozenColumns");


    //$('.jqgfirstrow td').css({"height": '5px !important'})


    $("#gridpropietario").jqGrid('setFrozenColumns');

    $("#gridpropietario").jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
    //pintando la cabecera 01 datos del expediente
    $('#gridpropietario_expediente_codigo,#gridpropietario_expediente_titulares,#gridpropietario_dni_ruc ').css({
        background: 'yellow',
        color: 'black'
    })

    //pintando la cabecera 02 datos del Predio
    $('#gridpropietario_proyeccion_ejercicio,#gridpropietario_grupos,#gridpropietario_clasificacion,#gridpropietario_sector,#gridpropietario_inform_pred_tipoafectacion,#gridpropietario_inform_pred_denominacion_predio,#gridpropietario_inform_pred_naturaleza_predio,#gridpropietario_inform_pred_p_e_predio,#gridpropietario_inform_pred_area_inscrita_matriz_m,#gridpropietario_inform_pred_area_inscrita_matriz_ha,#gridpropietario_inform_pred_area_directamente_afectada_m,#gridpropietario_inform_pred_area_directamente_afectada_ha,#gridpropietario_inform_pred_area_indirectamente_afectada_m,#gridpropietario_inform_pred_area_indirectamente_afectada_ha,#gridpropietario_inform_pred_area_remanente_m,#gridpropietario_inform_pred_area_remanente_ha,#gridpropietario_inform_pred_area_adquirida_m,#gridpropietario_inform_pred_area_adquirida_ha,#gridpropietario_inform_pred_tipoafectacion').addClass('inf_pred_afect_h')
    //pintando la cabecera 02 datos del Predio
    $('#gridpropietario_tipo_personeria,#gridpropietario_condicion_juridica,#gridpropietario_cajas,#gridpropietario_comentarios,#gridpropietario_profesional_responsable').addClass('block_datos_1_h')


    //pintando la cabecera 02 datos del Predio
    $('#gridpropietario_cbc_sunarp_num_oficio,#gridpropietario_cbc_sunarp_fecha_presentacion,#gridpropietario_cbc_sunarp_en_sunarp,#gridpropietario_cbc_sunarp_fecha_expedicion,#gridpropietario_cbc_sunarp_cbc_expedido').addClass('etapa_1_h_a')


    //pintando la cabecera 02 datos del Predio
    $('#gridpropietario_ofic_comuni_num_oficio,#gridpropietario_ofic_comuni_esnotificado,#gridpropietario_ofic_comuni_fecha_notificacion').addClass('etapa_1_h_b')
    $('#gridpropietario_anot_prevent_fecha_presentacion,#gridpropietario_anot_prevent_calificacion_sunarp,#gridpropietario_anot_prevent_anotacion_inscrita').addClass('etapa_1_h_a')
    $('#gridpropietario_gest_tasa_direc_nc_fecha_envio_dnc,#gridpropietario_gest_tasa_direc_nc_num_oficio_mtc,#gridpropietario_gest_tasa_direc_nc_en_dnc,#gridpropietario_gest_tasa_direc_nc_fecha_expedicion_tasacion,#gridpropietario_gest_tasa_direc_nc_con_documento_tasacion_expedido').addClass('etapa_1_h_b')
    $('#gridpropietario_interv_perito_perito,#gridpropietario_interv_perito_fecha_informe,#gridpropietario_interv_perito_informe_digital').addClass('etapa_1_h_a')
    $('#gridpropietario_valor_informe_tasacion').addClass('etapa_1_h_b')

    /**/
    $('#gridpropietario_cri_solicitado,#gridpropietario_cri_expedido').addClass('etapa_2_h_a')
    $('#gridpropietario_para_publicacion,#gridpropietario_doc_publicacion').addClass('etapa_2_h_b')
    $('#gridpropietario_certiticado_predupuestal_cp,#gridpropietario_certiticado_predupuestalnota_nro,#gridpropietario_certiticado_predupuestal_fecha').addClass('etapa_2_h_a')
    $('#gridpropietario_remision_oficio_intension_remision_oficio_intension,#gridpropietario_remision_oficio_intension_nro_oficio_intension,#gridpropietario_remision_oficio_intension_fecha_entrega').addClass('etapa_2_h_b')
    $('#gridpropietario_com_suj_pasi_mtc_aceptacion,#gridpropietario_com_suj_pasi_mtc_fecha_recepcion_comunicacion,#gridpropietario_com_suj_pasi_mtc_con_oposicion,#gridpropietario_com_suj_pasi_mtc_entrega_anticipada').addClass('etapa_2_h_a')
    $('#gridpropietario_estado').addClass('etapa_2_h_b')
    $('#gridpropietario_gestion_rm_memo_ddp,#gridpropietario_gestion_rm_memo_dgppt,#gridpropietario_gestion_rm_memo_envio_dgppt_dvt,#gridpropietario_gestion_rm_memo_tiene_rm,#gridpropietario_gestion_rm_fecha_expedicion,#gridpropietario_gestion_rm_fecha_publicacion,#gridpropietario_gestion_rm_numero_resolucion').addClass('etapa_2_h_a')

    /**/
    $('#gridpropietario_solicitud_devengado').addClass('devengado_h')
    /**/

    $('#gridpropietario_gestion_cheque_memo_finanzas_oga,#gridpropietario_gestion_cheque_memo_finanzas_oga_digital,#gridpropietario_gestion_cheque_fecha_memo,#gridpropietario_gestion_cheque_modalidad_pago,#gridpropietario_gestion_cheque_nro_cheque_deposito_judicial').addClass('etapa_3_h_b')
    $('#gridpropietario_fecha_pago_deposito').addClass('etapa_3_h_b')
    $('#gridpropietario_monto_pagar').addClass('etapa_3_h_a')
    $('#gridpropietario_pago_ejecutado').addClass('etapa_3_h_b')
    $('#gridpropietario_gest_independ_inscrip_sunarp_nro_titulo,#gridpropietario_gest_independ_inscrip_sunarp_fecha_solicitud,#gridpropietario_gest_independ_inscrip_sunarp_fecha_inscripcion,#gridpropietario_gest_independ_inscrip_sunarp_acto_inscrito_sunarp_favor_mtc,#gridpropietario_gest_independ_inscrip_sunarp_nueva_partida_registral').addClass('etapa_3_h_a')
    $('#gridpropietario_legalizaciones_formulario_registral,#gridpropietario_legalizaciones_formulario_registral_digital,#gridpropietario_legalizaciones_acta_entrega_terreno,#gridpropietario_legalizaciones_acta_entrega_terreno_digital,#gridpropietario_legalizaciones_acta_de_fe_entrega_cheque_deposito,#gridpropietario_legalizaciones_notaria_legalizaciones_fr').addClass('etapa_3_h_a')

    $('#gridpropietario_gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita,#gridpropietario_gestion_entrega_recepcion_predio_ddp_opat_fecha_acta,#gridpropietario_gestion_entrega_recepcion_predio_ddp_opat_representante_opat,#gridpropietario_gestion_entrega_recepcion_predio_ddp_opat_representante_ddp').addClass('etapa_3_h_b')
    $('#gridpropietario_predios_en_arbitraje_en_arbitraje,#gridpropietario_predios_en_arbitraje_con_laudo_arbitral,#gridpropietario_predios_en_arbitraje_observaciones').addClass('etapa_3_h_a')
    $('#gridpropietario_expediente_finalizados_derivados_opat,#gridpropietario_expediente_finalizados_observaciones').addClass('etapa_3_h_b')
    $('#gridpropietario_directorio').addClass('etapa_3_h_a')


    /**/

    $('#gridpropietario_val_comer_predio_valor_terreno,#gridpropietario_val_comer_predio_valor_edificacion,#gridpropietario_val_comer_predio_valor_plantaciones,#gridpropietario_val_comer_predio_valor_comercial_vc').addClass('val_terre_h_a')
    $('#gridpropietario_perjuicio_economico_lucro_cesante,#gridpropietario_perjuicio_economico_danio_emergente,#gridpropietario_perjuicio_economico_valor_pe').addClass('val_terre_h_b')
    $('#gridpropietario_valor_segun_tasacion_vc_pe').addClass('val_terre_h_a')
    $('#gridpropietario_beneficio_veinte_ciento').addClass('val_terre_h_b')
    $('#gridpropietario_impuesto_a_la_renta').addClass('val_terre_h_a')
    $('#gridpropietario_valor_certificar').addClass('val_terre_h_b')


    $("#gridpropietario").jqGrid('setGroupHeaders', {
        useColSpanStyle: false,
        groupHeaders: [
            {
                startColumnName: 'expediente_codigo',
                numberOfColumns: 3,
                titleText: 'DATOS EXPEDIENTE',
                "className": 'datos_expediente_h'
            },
            {
                startColumnName: 'proyeccion_ejercicio',
                numberOfColumns: 18,
                titleText: 'INFORMACION DEL PREDIO AFECTADO',
                "className": 'inf_pred_afect_h'
            },
            {startColumnName: 'tipo_personeria', numberOfColumns: 5, titleText: '', "className": 'block_datos_1_h'},
            {
                startColumnName: 'cbc_sunarp_num_oficio',
                numberOfColumns: 20,
                titleText: 'ETAPA - 1',
                "className": 'etapa_1_h_a'
            },
            {
                startColumnName: 'cri_solicitado',
                numberOfColumns: 22,
                titleText: 'ETAPA - 2',
                "className": 'etapa_2_h_a'
            },
            {startColumnName: 'solicitud_devengado', numberOfColumns: 1, titleText: '', "className": 'devengado_h'},
            {
                startColumnName: 'gestion_cheque_memo_finanzas_oga',
                numberOfColumns: 29,
                titleText: 'ETAPA - 3',
                "className": 'etapa_3_h_b'
            },
            {
                startColumnName: 'val_comer_predio_valor_terreno',
                numberOfColumns: 11,
                titleText: 'VALORIZACION DEL PREDIO',
                "className": 'val_terre_h_b'
            },

        ]
    });

    $("#gridpropietario").jqGrid('setGroupHeaders', {
        useColSpanStyle: false,
        groupHeaders: [
            {
                startColumnName: 'expediente_codigo',
                numberOfColumns: 3,
                titleText: '',
                "className": 'datos_expediente_h'
            },
            {
                startColumnName: 'proyeccion_ejercicio',
                numberOfColumns: 18,
                titleText: '', "className": 'inf_pred_afect_h'
            },
            {startColumnName: 'tipo_personeria', numberOfColumns: 5, titleText: '', "className": 'block_datos_1_h'},
            {
                startColumnName: 'cbc_sunarp_num_oficio',
                numberOfColumns: 5,
                titleText: 'CBC - SUNARP',
                "className": 'etapa_1_h_a'
            },
            {
                startColumnName: 'ofic_comuni_num_oficio',
                numberOfColumns: 3,
                titleText: 'OFICIO COMUNICACION ',
                "className": 'etapa_1_h_b'
            },
            {
                startColumnName: 'anot_prevent_fecha_presentacion',
                numberOfColumns: 3,
                titleText: 'ANOTACION PREVENTIVA DL 1192 ', "className": 'etapa_1_h_a'
            },
            {
                startColumnName: 'gest_tasa_direc_nc_fecha_envio_dnc',
                numberOfColumns: 5,
                titleText: 'GESTION PARA TASACION - EN DIRECCION NACIONAL DE CONTRUCCION - DNC - MVCS'
                , "className": 'etapa_1_h_b'
            },
            {
                startColumnName: 'interv_perito_perito',
                numberOfColumns: 3,
                titleText: 'CON INTERVENCION DE PERITO - RM 763-2018MTC/01', "className": 'etapa_1_h_a'
            },
            {
                startColumnName: 'valor_informe_tasacion',
                numberOfColumns: 1,
                titleText: '', "className": 'etapa_1_h_b'
            },
            {startColumnName: 'cri_solicitado', numberOfColumns: 2, titleText: 'CRI', "className": 'etapa_2_h_a'},
            {startColumnName: 'para_publicacion', numberOfColumns: 2, titleText: '', "className": 'etapa_2_h_b'},
            {
                startColumnName: 'certiticado_predupuestal_cp',
                numberOfColumns: 3,
                titleText: 'CERTIFICACION PRESUPUESTAL',
                "className": 'etapa_2_h_a'
            },
            {
                startColumnName: 'remision_oficio_intension_remision_oficio_intension',
                numberOfColumns: 3,
                titleText: 'REMISION DE OFICIO DE INTENSION',
                "className": 'etapa_2_h_b'
            },
            {
                startColumnName: 'com_suj_pasi_mtc_aceptacion',
                numberOfColumns: 4,
                titleText: 'COMUNICACION DEL SUJETO PASIVO A MTC',
                "className": 'etapa_2_h_a'
            },
            {startColumnName: 'estado', numberOfColumns: 1, titleText: '', "className": 'etapa_2_h_b'},
            {
                startColumnName: 'gestion_rm_memo_ddp',
                numberOfColumns: 7,
                titleText: 'GESTION RM',
                "className": 'etapa_2_h_a'
            },
            {startColumnName: 'solicitud_devengado', numberOfColumns: 1, titleText: '', "className": 'devengado_h'},
            {
                startColumnName: 'gestion_cheque_memo_finanzas_oga',
                numberOfColumns: 5,
                titleText: 'GESTION CHEQUE',
                "className": 'etapa_3_h_b'
            },
            {
                startColumnName: 'legalizaciones_formulario_registral',
                numberOfColumns: 6,
                titleText: 'LEGALIZACIONES',
                "className": 'etapa_3_h_a'
            },
            {startColumnName: 'fecha_pago_deposito', numberOfColumns: 1, titleText: '', "className": 'etapa_3_h_b'},
            {startColumnName: 'monto_pagar', numberOfColumns: 1, titleText: '', "className": 'etapa_3_h_a'},
            {startColumnName: 'pago_ejecutado', numberOfColumns: 1, titleText: '', "className": 'etapa_3_h_b'},
            {
                startColumnName: 'gest_independ_inscrip_sunarp_nro_titulo',
                numberOfColumns: 5,
                titleText: 'GESTION DE INDEPENDIZACION / INSCRIPCION SUNARP',
                "className": 'etapa_3_h_a'
            },
            {
                startColumnName: 'gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita',
                numberOfColumns: 4,
                titleText: 'GESTION DE ENTREGA - RECEPCION DE PREDIO DDP - OPAT',
                "className": 'etapa_3_h_b'
            },
            {
                startColumnName: 'predios_en_arbitraje_en_arbitraje',
                numberOfColumns: 3,
                titleText: 'PREDIOS EN ARBITRAJE',
                "className": 'etapa_3_h_a'
            },
            {
                startColumnName: 'expediente_finalizados_derivados_opat',
                numberOfColumns: 2,
                titleText: 'EXPEDIENTE FINALIZADOS',
                "className": 'etapa_3_h_b'
            },
            {startColumnName: 'directorio', numberOfColumns: 1, titleText: '', "className": 'etapa_3_h_a'},

            {
                startColumnName: 'val_comer_predio_valor_terreno',
                numberOfColumns: 4,
                titleText: 'VALOR COMERCIAL DEL TERRENO',
                "className": 'val_terre_h_a'
            },
            {
                startColumnName: 'perjuicio_economico_lucro_cesante',
                numberOfColumns: 3,
                titleText: 'PERJUICIO ECONOMICO',
                "className": 'val_terre_h_b'
            },
            {
                startColumnName: 'valor_segun_tasacion_vc_pe',
                numberOfColumns: 1,
                titleText: '',
                "className": 'val_terre_h_a'
            },
            {
                startColumnName: 'beneficio_veinte_ciento',
                numberOfColumns: 1,
                titleText: '',
                "className": 'val_terre_h_b'
            },
            {startColumnName: 'impuesto_a_la_renta', numberOfColumns: 1, titleText: '', "className": 'val_terre_h_a'},
            {startColumnName: 'valor_certificar', numberOfColumns: 1, titleText: '', "className": 'val_terre_h_b'},


        ]
    });



    /*Cargado la data*/



}


const cargarGrid = (response) => {
    if (response.length == 0) {
        alert('No se encontro resultados.')
        $('#gridpropietario').jqGrid('clearGridData');
        jQuery("#gridpropietario").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
    } else {
        $('#gridpropietario').jqGrid('clearGridData');
        jQuery("#gridpropietario").jqGrid('setGridParam', {data: response}).trigger('reloadGrid');
    }
}

const Axios = initAxiosInterceptors();

/*Listar expedientes de adquisicio y expropiacion por proyecto*/


/*gUARDANDO LOS DATOS GENERADOS*/
async function savechanges(expediente) {
   // alert(JSON.stringify(expediente))
    const {data} = await Axios.post(`/save_adquisicion_predial`, expediente);
    return data
}

/*Mostrar el modal de subida de archivos */


const TablePropietario = ({data,buscarExpedientes}) => {


    const [gdata, set_gdata] = useState(data);
    const [row_id, set_row_id] = useState(0);
    const [name_propertie, set_name_propertie] = useState(null);
    const [showModalUpload, set_ModalUpload] = useState(false);
    /*Obteniendo la lista de los esquipos*/
    useEffect(() => {
        const init = async () => {
            await creteGrid(gdata);
            cargarGrid(gdata);
            //let data = await getListProyectos(opcion, idproyecto, busqueda);
            //   alert(JSON.stringify(data))
            //  alert(JSON.stringify(gdata))

        }
        init()

    }, [gdata]);

    window.showModalUplaodGrid=function (openclose,name_propertie,row_id) {
        set_ModalUpload(openclose)
        set_name_propertie(name_propertie)
        set_row_id(row_id)
    }

    const closeModalUploadImage = () => {
        set_ModalUpload(false)
        set_name_propertie(null)
        set_row_id(0)
    }

    const actualizargrid= (e) => {
        buscarExpedientes(e)
    }




    return (
        <>
            <div className="panel panel-default table-responsive">
                <table id="gridpropietario"></table>
                <div id="paperpropietario"></div>
            </div>

            {
                !showModalUpload ? '': <ModalUploadFile name_propertie={name_propertie} row_id={row_id} closeModalUploadImage={closeModalUploadImage} actualizargrid={actualizargrid}></ModalUploadFile>
            }

        </>
    );
};




export default TablePropietario;