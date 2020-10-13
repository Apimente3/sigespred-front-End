import React, {useEffect} from 'react';
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";

const {$, jQuery, alasql} = window;

//require("../grids/css.css")


let $grid = $("#gridplano")
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
        "name": "gestionpredialid",
        "index": "gestionpredialid",
        "align": "left",
        "width": 400,
        "editable": false,
        "search": false,
        "hidden": true,
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
        "name": "profesionalid",
        "index": "profesionalid",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
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
        "name": "departamentoid",
        "index": "departamentoid",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {
        "name": "provinciaid",
        "index": "provinciaid",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {
        "name": "distritoid",
        "index": "distritoid",
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


const gridcolNames = ["ID", "CÓDIGO DE PLANO", "GP. ID ", "PROYECTO", "PROFESIONAL ID", "PROFESIONAL", "FECHA DE CREACIÓN", "DEPARTAMENTO ID", "PROVINCIA ID"
    , "DISTRITO ID", "DIGITAL", "ANTECEDENTES"];


const creteGrid = () => {
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
        beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {
            try {
                var rowData = {...jQuery('#gridplano').jqGrid('getRowData', rowid), [cellname]: value};
                savechanges({[cellname]: value, id: rowData.id});
                toastr.info('Se actualizao correctamente la tabla ', {"position": "bottom-center",});
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

async function getListPlanos(busqueda = '') {
    const planos = await Axios.get(`/plano/buscar`);
    return planos;
}

/*gUARDANDO LOS DATOS GENERADOS*/
async function savechanges(expediente) {
    // alert(JSON.stringify(expediente))
    const {data} = await Axios.post(`/save_adquisicion_predial`, expediente);
    return data
}

const GridPlano = () => {

    /*Obteniendo la lista de los esquipos*/
    useEffect(() => {
        const init = async () => {
            await creteGrid();
            let data = await getListPlanos();
            await cargarGrid(data)
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