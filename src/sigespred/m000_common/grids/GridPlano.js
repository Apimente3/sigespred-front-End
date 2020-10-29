import React, {useEffect, useState} from 'react';
import {initAxiosInterceptors} from "../../../config/axios";
import {toastr} from "react-redux-toastr";
import MArcDigital from "../../_ddp_planos/MArcDigital";
import history from '../../../history';

const {$, jQuery, alasql} = window;
let $grid = $("#gridplano")
const Axios = initAxiosInterceptors();

const initDateSearch = function (elem) {

};


window.editPlanoJqGrid=function (row_id) {
    history.push({pathname:`/plano-edit/${row_id}`});
}

window.addLinkedPlano=function (codplano) {
    history.push({pathname:`/plano-add/${codplano}`,
                  //search: `codigo=${codplano}`
                  //state: { params: {codigo: codplano} }
                });
}

window.deletePlano = function(row_id, codplano){
    console.log(codplano);
    try {
        const toastrConfirmOptions = {
            onOk: () => ejecutarEliminar(row_id),
            //onCancel: () => history.push('/planos')
        };
        toastr.confirm(`¿Desea eliminar el plano: ${codplano}?`, toastrConfirmOptions);
    }
    catch (e) {
        alert(e.message)
    }
}

window.cargarPopupDigital = function(){
    console.log('Revisar');
    //setMostrarPopup(true);
}

const ejecutarEliminar = (id) => {
    Axios.delete(`/plano/${id}`)
    .then(() => {
      history.push('/planos');
    })
    .catch(error => {
        console.log(error)
    });
}


const numberTemplate = {
    formatter: "number", align: "right", sorttype: "number",
    editrules: {number: true, required: true},
    searchoptions: {sopt: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"]}
};

function linkDigitales(cellValue, options, rowdata, action) 
{
    return `<a class="cursorpointer" onclick="window.cargarPopupDigital(${options.rowId})" >${cellValue}</a>`;
}  

const gridcolumnModel = [
    {
        "name": "id",
        "index": "id",
        "align": "center",
        "width": 45,
        "editable": false,
        "search": false,
        "hidden": false,
        frozen : true
    },

    {
        "name": "codplano",
        "index": "codplano",
        "align": "left",
        "width": 205,
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
        "width": 120,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {
        "name": "fechacreacion",
        "index": "fechacreacion",
        "align": "center",
        "width": 130,
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
        "align": "center",
        "width": 60,
        "editable": true,
        "search": false,
        "hidden": false,
        "formatter":linkDigitales, 
        //"formatoptions":{baseLinkUrl:'someurl.php', addParam: '&action=edit'}
    },

    {
        "name": "antecedente",
        "index": "antecedente",
        "align": "center",
        "width": 90,
        "editable": true,
        "search": false,
        "hidden": false
    },

    {   "name":"act",
        "index":"act",
        "align": "center",
        "width":185,
        "sortable":false
    },
    ]

const gridcolNames = ["ID", "CÓDIGO DE PLANO", "PROYECTO", "PROFESIONAL", "FECHA DE CREACIÓN", "UBICACIÓN", "DIGITAL", "ANTECEDENTES", "ACCIONES"];

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
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,
        gridComplete: function(){
            var ids = jQuery("#gridplano").jqGrid('getDataIDs');
            for(var i=0;i < ids.length;i++){
                var cl = ids[i];                
                var codplano = jQuery("#gridplano").jqGrid ('getRowData', cl).codplano;
                let bdw = `<button class="btn mright-5" onclick="alert('pendiente')"><i class="fa fa-download"></i></button>`;
                let bl = `<button class="btn mright-5" title="Refenciar al plano en uno nuevo" onclick="window.addLinkedPlano('${codplano}')"><i class="fa fa-link"></i></button>`;
                let be = `<button class="btn mright-5" title="Editar plano" onclick="window.editPlanoJqGrid(${cl})" ><i class='fa fa-edit'></i></button>`;
                let bd = `<button class="btn" onclick="window.deletePlano(${cl},'${codplano}')"><i class="fa fa-trash"></i></button>`;
                //let concatBtn = bdw+bl+be+bd;
                let concatBtn = bl+be+bd;
                jQuery("#gridplano").jqGrid('setRowData',ids[i],{act:concatBtn});
            }	
        },
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

const GridPlano = (datos) => {
    const [mostrarPopup, setMostrarPopup] = useState(false);

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
                {mostrarPopup && <MArcDigital/>}
            </>
        );
};

export default GridPlano;