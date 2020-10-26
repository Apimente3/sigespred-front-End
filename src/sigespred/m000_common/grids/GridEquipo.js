import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";

const {$, jQuery, alasql} = window;

//require("../grids/css.css")


let $grid = $("#gridequipo")
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
        "name": "GestionPredial.denominacion",
        "index": "GestionPredial.denominacion",
        "align": "left",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },
    {
        "name": "equipo",
        "index": "equipo",
        "align": "left",
        "width": 200,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },

    {
        "name": "Area.nombre",
        "index": "Area.nombre",
        "align": "left",
        "width": 400,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },
    {
        "name": "activo",
        "index": "activo",
        "align": "left",
        "width": 80,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen:true
    },
    {
        "name": "proyectoid",
        "index": "proyectoid",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": true
    },
    {
        "name": "Area.id",
        "index": "Area.id",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": true
    },
    {
        "name": "UsuarioInEquipo",
        "index": "UsuarioInEquipo",
        "align": "left",
        "width": 200,
        "editable": true,
        "search": false,
        "hidden": true
    },
    { "name": 'edit',
     "index": 'edit',
     "align": "left",
     "width": 200,
     "editable": true,
     "search": false,
     "hidden": false,
      "formatter": addLink
    }

    ]


const gridcolNames = ["ID","GESTION PREDIAL", "EQUIPO", "AREA", "ESTADO", "PROYECTOID", "AREAID","USUARIOS","EDITAR"];


const createGrid = () => {
    let grid = $("#gridequipo").jqGrid({
        datatype: "local",
        width: 500,
        height: 500,
        ignoreCase: true,
        //multiselect: false,
        styleUI: 'Bootstrap',
        colNames: gridcolNames,
        colModel: gridcolumnModel,
        pager: '#pagerequipo',
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
                var rowData = {...jQuery('#gridequipo').jqGrid('getRowData', rowid), [cellname]: value};
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

    //$("#gridpartida").jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
    //$("#gridpartida").jqGrid("setFrozenColumns");
}
const redirectOnClick = () => {
    alert("ds");
    Link.push('/trabajador-edit/12');
  }

let history = Link;
window.ff=function () {
    
    
    history.push('/trabajador-edit/12');
}

function addLink(cellvalue, options, rowObject) 
{
  //to get row Id
  alert(options.rowId);
  // to get product Id
  alert(rowObject.id);
  return `<a href="#" onclick="${redirectOnClick}" ><i class="fa fa-upload" aria-hidden="true"></i> Subir Archivo</a>`;
}

const cargarGrid = (response) => {
    if (response.length == 0) {
        alert('No se encontro resultados.')
        $('#gridequipo').jqGrid('clearGridData');
        jQuery("#gridequipo").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
    } else {
        $('#gridequipo').jqGrid('clearGridData');
        jQuery("#gridequipo").jqGrid('setGridParam', response).trigger('reloadGrid');
    }
}

const Axios = initAxiosInterceptors();

async function getListEquipos(busqueda = '') {
    const equipos = await Axios.get(`/equipo`);
    
    return equipos;
}

/*gUARDANDO LOS DATOS GENERADOS*/
async function savechanges(expediente) {
    // alert(JSON.stringify(expediente))
    const {data} = await Axios.post(`/save_adquisicion_predial`, expediente);
    return data
}

const GridEquipo = () => {

    /*Obteniendo la lista de los esquipos*/
    useEffect(() => {
        const init = async () => {
            await createGrid();
            let data = await getListEquipos();
            await cargarGrid(data)
        }
        init()

    }, []);
    return (
        <>
            <div className="panel panel-default table-responsive">
                <table id="gridequipo"></table>
                <div id="pagerequipo"></div>
            </div>
        </>
    );
};

export default GridEquipo;