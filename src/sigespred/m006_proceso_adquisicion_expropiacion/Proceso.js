import React, {useState, useCallback} from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import {Toolbar, Data, Filters, Editors} from "react-data-grid-addons";
import Header from "../m000_common/headers/Header";
import UploadFile from "../../components/helpers/uploaders/UploadExpFiles";
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import TablePropietario from "../m000_common/grids/TablePropietario";

const CustomHeader=()=>{
   
        return (
            <div>soy el header</div>
        )
    
}






/*Definiendo los filtros*/
const selectors = Data.selectors;
const {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter,
} = Filters;

const {DropDownEditor} = Editors;

const tipoGrupos = [
    {id: "PRIMER GRUPO", value: "PRIMER GRUPO"},
    {id: "SEGUNDO GRUPO", value: "SEGUNDO GRUPO"},
    {id: "TERCER GRUPO", value: "TERCER GRUPO"}
]


const desicions = [
    {id: "SI", value: "SI"},
    {id: "NO", value: "NO"},
]

const tipoGrupoEditor=<DropDownEditor options={tipoGrupos}/>
const drptipodesicion=<DropDownEditor options={desicions}/>


const columns =
    [
        {"key": "expediente_id", hidden: true, "width": 0},
        {
            "key": "expediente_codigo",
            "name": "CODIGO EXPEDIENTE",
            "editable": false,
            "width": 200,
            "frozen": true,
            "filterable": true,
            "sortable": true ,
            filterRenderer: AutoCompleteFilter,
            headerRenderer:CustomHeader
        },
        {
            "key": "expediente_titulares",
            "name": "TITULARES",
            "editable": false,
            "width": 300,
            "frozen": true,
            "filterable": true,
            "sortable": true
        },
        {
            "key": "dni_ruc",
            "name": "DNI/RUC",
            "editable": false,
            "width": 120,
            "frozen": true,
            "filterable": true,
            "sortable": true
        },
        {
            "key": "proyeccion_ejercicio",
            "name": "PROYECCION 2019",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "grupos",
            "name": "GRUPOS\n",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true,
            editor:tipoGrupoEditor
        },
        {
            "key": "clasificacion",
            "name": "CLASIFICACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "sector",
            "name": "SECTOR",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_denominacion_predio",
            "name": "DENOMINACION DEL PREDIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_naturaleza_predio",
            "name": "NATURALEZA DEL PREDIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_p_e_predio",
            "name": "P.E. PREDIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_inscrita_matriz_m",
            "name": "AREA INSCRITA MATRIZ  (M2)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_inscrita_matriz_ha",
            "name": "AREA INSCRITA  MATRIZ (HA)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_directamente_afectada_m",
            "name": "inform_pred_area_directamente_afectada_m",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_directamente_afectada_ha",
            "name": "AREA  DIRECTAMENTE AFECTADA (HAS)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_indirectamente_afectada_m",
            "name": "inform_pred_area_indirectamente_afectada_m",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_indirectamente_afectada_ha",
            "name": "AREA INDIRECTAMENTE AFECTADA (HA)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_remanente_m",
            "name": "inform_pred_area_remanente_m",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_remanente_ha",
            "name": "AREA REMANENTE (HA)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_adquirida_m",
            "name": "inform_pred_area_adquirida_m",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_area_adquirida_ha",
            "name": "AREA  ADQUIRIDA (HA)",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "inform_pred_tipoafectacion ",
            "name": "TIPO DE AFECTACION DEL PREDIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "tipo_personeria",
            "name": "TIPO DE PERSONERIA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "condicion_juridica",
            "name": "CONDICION JURIDICA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cajas",
            "name": "CAJAS",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "comentarios",
            "name": "COMENTARIOS",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "profesional_responsable",
            "name": "PROFESIONAL RESPONSABLE\n ",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cbc_sunarp_num_oficio",
            "name": "N° DE OFICIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cbc_sunarp_fecha_presentacion",
            "name": "FECHA DE PRESENTACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cbc_sunarp_en_sunarp",
            "name": "EN SUNARP",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
            ,
            editor:drptipodesicion
        },
        {
            "key": "cbc_sunarp_fecha_expedicion",
            "name": "FECHA DE EXPEDICION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cbc_sunarp_cbc_expedido",
            "name": "CON CBC EXPEDIDO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "ofic_comuni_num_oficio",
            "name": "N° DE OFICIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "ofic_comuni_esnotificado ",
            "name": "NOTIFICADO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "ofic_comuni_fecha_notificacion",
            "name": "FECHA\nDE NOTIFICACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "anot_prevent_fecha_presentacion",
            "name": "FECHA DE PRESENTACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "anot_prevent_calificacion_sunarp",
            "name": "EN CALIFICACION DE SUNARP",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "anot_prevent_anotacion_inscrita",
            "name": "ANOTACION INSCRITA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_tasa_direc_nc_fecha_envio_dnc",
            "name": "FECHA DE ENVIO A LA DNC",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_tasa_direc_nc_num_oficio_mtc",
            "name": "N° DE OFICIO MTC",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_tasa_direc_nc_en_dnc",
            "name": "EN DNC",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_tasa_direc_nc_fecha_expedicion_tasacion",
            "name": "FECHA DE  EXPEDICION DE TASACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_tasa_direc_nc_con_documento_tasacion_expedido",
            "name": "CON DOCUMENTO DE TASACION EXPEDIDO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "interv_perito_perito",
            "name": "PERITO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "interv_perito_fecha_informe",
            "name": "FECHA DE INFORME",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "interv_perito_informe_digital",
            "name": "interv_perito_informe_digital",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "valor_informe_tasacion",
            "name": "VALOR DE INFORME TASACION S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cri_ solicitado ",
            "name": "SOLICITADO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "cri_expedido",
            "name": "EXPEDIDO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "para_publicacion",
            "name": "PARA PUBLICACION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "doc_publicacion",
            "name": "doc_publicacion",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "certiticado_predupuestal_cp",
            "name": "CON CP",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "certiticado_predupuestalnota_nro",
            "name": "NOTA N° ",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "certiticado_predupuestal_fecha",
            "name": "FECHA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "remision_oficio_intension_remision_oficio_intension",
            "name": "REMISION DE OFICIO DE INTENSION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "remision_oficio_intension_nro_oficio_intension",
            "name": "N° DE OFICIO-",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "remision_oficio_intension_fecha_entrega",
            "name": "FECHA DE ENTREGA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "com_suj_pasi_mtc_aceptacion",
            "name": "ACEPTACION (SIN OPOSICIÓN)\n",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "com_suj_pasi_mtc_fecha_recepcion_comunicacion",
            "name": "FECHA DE RECEPCION DE COMUNICACIÓN ",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "com_suj_pasi_mtc_con_oposicion",
            "name": "CON OPOSICIÓN\n",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "com_suj_pasi_mtc_entrega_anticipada",
            "name": "ENTREGA ANTICIPADA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "estado",
            "name": "ESTADO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_memo_ddp",
            "name": "CON MEMO DDP",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_memo_dgppt",
            "name": "MEMO\nDDP-DGPPT",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_memo_envio_dgppt_dvt",
            "name": "MEMO DE ENVIO  \nDGPPT-DVT",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_memo_tiene_rm",
            "name": "CON RM",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_fecha_expedicion",
            "name": "FECHA DE EXPEDICION RM",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_fecha_publicacion",
            "name": "FECHA DE PUBLICACION RM",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_rm_numero_resolucion",
            "name": "NUMERO DE RESOLUCION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_cheque_memo_finanzas_oga",
            "name": "MEMO A FINANZAS / OGA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_cheque_memo_finanzas_oga_digital",
            "name": "gestion_cheque_memo_finanzas_oga_digital",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_cheque_fecha_memo",
            "name": "FECHA DE MEMO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_cheque_modalidad_pago",
            "name": "MODALIDAD DE PAGO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_cheque_nro_cheque_deposito_judicial",
            "name": "gestion_cheque_nro_cheque_deposito_judicial",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "legalizaciones_formulario_registral",
            "name": "FORMULARIO REGISTRAL",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "legalizaciones_formulario_registral_digital",
            "name": "legalizaciones_formulario_registral_digital",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "legalizaciones_acta_entrega_terreno",
            "name": "ACTA DE ENTREGA DE TERRENO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "legalizaciones_acta_entrega_terreno_digital",
            "name": "legalizaciones_acta_entrega_terreno_digital",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "legalizaciones_notaria_legalizaciones_fr",
            "name": "NOTARIA LEGALIZACION - F.R.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "fecha_pago_deposito",
            "name": "FECHA PAGO /DEPOSITO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "monto_pagar",
            "name": "MONTO A PAGAR S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "pago_ejecutado",
            "name": "PAGO EJECUTADO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_independ_inscrip_sunarp_nro_titulo",
            "name": "N° DE TITULO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_independ_inscrip_sunarp_fecha_solicitud",
            "name": "FECHA \nDE SOLICITUD",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_independ_inscrip_sunarp_fecha_inscripcion",
            "name": "FECHA DE INSCRIPCION",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_independ_inscrip_sunarp_acto_inscrito_sunarp_favor_mtc",
            "name": "ACTO INSCRITO EN SUNARP -\n A FAVOR MTC",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gest_independ_inscrip_sunarp_nueva_partida_registral",
            "name": "NUEVA PARTIDA REGISTRAL",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita",
            "name": "CON ACTA  SUSCRITA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_entrega_recepcion_predio_ddp_opat_fecha_acta",
            "name": "FECHA DE ACTA",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_entrega_recepcion_predio_ddp_opat_representante_opat",
            "name": "REPRESENTANTE DE OPAT",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "gestion_entrega_recepcion_predio_ddp_opat_representante_ddp",
            "name": "REPRESENTANTE \nDDP",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "predios_en_arbitraje_en_arbitraje",
            "name": "EN ARBITRAJE",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "predios_en_arbitraje_con_laudo_arbitral",
            "name": "CON LAUDO\nARBITRAL",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "predios_en_arbitraje_observaciones",
            "name": "OBSERVACIONES",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "expediente_finalizados_derivados_opat",
            "name": "DERIVADOS A OPAT",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "expediente_finalizados_observaciones",
            "name": "OBSERVACIONES",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "directorio",
            "name": "DIRECTORIO",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "val_comer_predio_valor_terreno",
            "name": "VALOR DE TERRENO S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "val_comer_predio_valor_edificacion",
            "name": "VALOR DE EDIFICACION S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "val_comer_predio_valor_plantaciones",
            "name": "VALOR DE PLANTACIONES S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "val_comer_predio_valor_comercial_vc",
            "name": "VALOR COMERCIAL - VC S/",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "perjuicio_economico_lucro_cesante",
            "name": "LUCRO CESANTE S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "perjuicio_economico_danio_emergente",
            "name": "DAÑO EMERGENTE S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "perjuicio_economico_valor_pe",
            "name": "VALOR PE S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "valor_segun_tasacion_vc_pe",
            "name": "VALOR SEGÚN TASACION VC+PE",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "beneficio_veinte_ciento",
            "name": "BENEFICIO DEL 20%\n",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "impuesto_a_la_renta",
            "name": "IMPUESTO A LA RENTA (SUJ.PASV) ",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        },
        {
            "key": "valor_certificar",
            "name": "VALOR  A CERTIFICAR S/.",
            "editable": true,
            "width": 200,
            "frozen": "false",
            "filterable": true,
            "sortable": true
        }]

columns.map(c => ({ ...c, ...{resize:true} }));

const rows = [
    {expediente_id: 25, title: "Task 1", complete: 20},
    {expediente_id: 11, title: "Task 2", complete: 40},
    {expediente_id: 36, title: "Task 3", complete: 60}
];

/*Funcion que permite ordenar acendete y descendetemente una columna de la tabla*/
const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    const comparer = (a, b) => {
        if (sortDirection === 'ASC') {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === 'DESC') {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    }
    return sortDirection == "NONE" ? initialRows : [...rows].sort(comparer)
}

/*Funcion que permite ordenar acendete y descendetemente una columna de la tabla*/
const handleFilterChange = filter => filters => {

    const newFilters = {...filters};
    if (filter.filterTerm) {
        newFilters[filters.column.key] = filter;
    } else {
        delete newFilters[filters.column.key]
    }
    return newFilters;
}

function getValidFilterValues(rows, columnId) {
    return rows
        .map(r => r[columnId])
        .filter((item, i, a) => {
            return i === a.indexOf(item)
        })
}

function getRows(rows, filters) {
    return selectors.getRows({rows, filters})

}


const Proceso = ( {history, match}) => {


    const {codigo_proyecto} = match.params;
    const [editedRows, setEditedRows] = useState(rows);


    /*Evento que me se ejecuta al realizar la actualizacion de una celda*/
    const onGridRowsUpdated = useCallback(({fromRow, toRow, updated}) => {
        setEditedRows(rows => {

            alert(rows[fromRow].expediente_id + '-->' + JSON.stringify(updated))
            const withEdited = [...rows];
            for (let i = fromRow; i <= toRow; i++) {
                withEdited[i] = {...withEdited[i], ...updated};
            }
            return withEdited;
        });
    }, []);


    return (
        <>     <Header></Header>
            <SiderBarDiagnostico solicitud={codigo_proyecto}/>
            <div id="wrapper" className="preload" >


                <div id="main-container" style={{padding: '20px', marginLeft: '220px', marginTop: '55px'}}>
                    <div id="breadcrumb">
                        <ul className="breadcrumb">
                            <li><i className="fa fa-home"></i><a href="index.html"> Proyecto</a></li>
                            <li className="active">Predio</li>
                            <li className="active">Expediente:</li>
                        </ul>
                    </div>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard1" noValidate="">
                            <div className="panel-heading">

                            </div>
                            <div className="panel-tab">
                                <ul className="wizard-steps wizard-demo" id="wizardDemo1">
                                    <li className="active">
                                        <a href="#wizardContent1" data-toggle="tab"> PROCESO DE ADQUISICION Y
                                            EXPROPIACION -> </a>
                                    </li>

                                </ul>
                            </div>

                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="wizardContent1">

                                        <ReactDataGrid
                                            columns={columns}
                                            rowGetter={i => editedRows[i]}
                                            rowsCount={5}
                                            onGridRowsUpdated={onGridRowsUpdated}
                                            enableCellSelect={true}
                                            toolbar={<Toolbar enableFilter={true}/>}
                                            onAddFilter={filter => setEditedRows(handleFilterChange(filter))}
                                            onClearFilters={() => setEditedRows({})}
                                            onGridSort={(sortColumn, sortDirection) =>
                                                setEditedRows(sortRows(editedRows, sortColumn, sortDirection))
                                            }
                                            getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
                                            superHeaders={[{key:'unique',span:3}]}

                                        />
                                        
                                        <TablePropietario/>


                                    </div>

                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                              
                                <div className="pull-right">

                                    <button type="submit"
                                            className="btn btn-default btn-sm btn-control"><i
                                        className="fa fa-angle-left" aria-hidden="true"></i> Atras
                                    </button>
                                   
                                </div>

                                <div className="pull-right">
                                    <div className="progress progress-striped active m-top-sm m-bottom-none">
                                        <div className="progress-bar progress-bar-success" id="wizardProgress">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          
           
         
        </>
       
    );
};



export default Proceso;