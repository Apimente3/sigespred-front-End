import React, {useEffect} from 'react';
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";

const {$, jQuery, alasql} = window;
//require("../grids/css.css")

let $grid = $("#gridplano")

const initDateSearch = function (elem) {

};
const numberTemplate = {
    formatter: "number", align: "right", sorttype: "number",
    editrules: {number: true, required: true},
    searchoptions: {sopt: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"]}
};

const gridcolumnModel = [
    {
        "name": "id",
        "index": "id",
        "align": "left",
        "width": 60,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen : true
    },

    {
        "name": "codplano",
        "index": "codplano",
        "align": "left",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },
    {
        "name": "denominacion",
        "index": "denominacion",
        "align": "left",
        "width": 180,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },
    {
        "name": "profesional",
        "index": "profesional",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {
        "name": "fechacreacion",
        "index": "fechacreacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false, sorttype: "date",
        formatter: "date",
        formatoptions: {newformat: "Y-m-d"}
    },

    {
        "name": "ubicacion",
        "index": "ubicacion",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    },
    {
        "name": "digital",
        "index": "digital",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {
        "name": "antecedente",
        "index": "antecedente",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    }
    ]

const gridcolNames = ["ID", "CÓDIGO DE PLANO", "PROYECTO", "PROFESIONAL", "FECHA DE CREACIÓN", "UBICACIÓN", "DIGITAL", "ANTECEDENTES"];


const createGrid = () => {
    let grid = $("#gridplano").jqGrid({
        datatype: "local",
        width: 500,
        height: 500,
        ignoreCase: true,
        //multiselect: false,
        styleUI: 'Bootstrap',
        colNames: gridcolNames,
        colModel: gridcolumnModel,
        pager: '#pagerplano',
        viewrecords: true,
        sortname: "id",
        sortorder: "desc",
        sortable: true,
        //storname: 'idexpediente',
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: "10",
        //   ondblClickRow: setSessionProyecto,
        rowList: [10, 20, 30],
        'cellsubmit': 'clientArray',
        afterSubmit: function (resp, postdata) {
            console.log(resp, postdata)

        },
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,
    });

    //$("#gridplano").jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
    //$("#gridplano").jqGrid("setFrozenColumns");
}


const cargarGrid = (response) => {
    if (response.length == 0) {
        alert('No se encontro resultados.')
        $('#gridplano').jqGrid('clearGridData');
        jQuery("#gridplano").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
    } else {
        $('#gridplano').jqGrid('clearGridData');
        jQuery("#gridplano").jqGrid('setGridParam', response).trigger('reloadGrid');
    }
}

const Axios = initAxiosInterceptors();

const GridPlano = (datos) => {
    useEffect(() => {
        const init = async () => {
            await createGrid();
            let varData = datos[Object.keys(datos)[0]];
            await cargarGrid({data:varData});
        }
        init()

    }, []);
    
        return (
            <>
                <div className="panel panel-default table-responsive">
                    <table id="gridplano"></table>
                    <div id="pagerplano"></div>
                </div>
            </>
        );
};

export default GridPlano;