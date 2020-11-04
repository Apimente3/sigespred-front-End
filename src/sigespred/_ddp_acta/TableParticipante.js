import React,{useState, useEffect} from 'react';

const TableParticipante = ({data=[], checkAsistencia}) => {
    
        let table = []
        let children = []
        let nro=0;
        data.forEach((item, key) => {
            nro++;
            children.push(<td><div class="list-group-item-text">
            <img class="img-circle-pro" src="//dummyimage.com/100x100.jpg" />
            <div class="pull-left m-left-sm m-bottom-sm">
            <br></br>
                <strong>{` ${item.nombre}`}</strong>
                <br></br><span class="badge badge-success">Asistencia </span>
                <input type="checkbox" name="asistencia" onChange={(e) => checkAsistencia(key,e) }/>
            </div>
            </div></td>)
            if(nro%3==0){
                table.push(<tr>{children}</tr>)
                children = [];
            }
            if(nro==data.length){
                table.push(<tr>{children}</tr>)
                children = [];
            }
        })

    return (
        <>
            <table class="table table-bordered table-condensed table-hover table-striped" id="dataTableActividad">
                {table}           
            </table>

        </>
    );
};

export default TableParticipante;