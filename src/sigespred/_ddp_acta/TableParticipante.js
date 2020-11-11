import React,{useState, useEffect} from 'react';

const TableParticipante = ({data=[], checkAsistencia}) => {
    
        let table = []
        let children = []
        let nro=0;
        data.forEach((item, key) => {
            nro++;
            children.push(<td key={item.id}><div class="list-group-item-text">
            <img class="img-circle-pro" src="//dummyimage.com/100x100.jpg" />
            <div class="pull-left m-left-sm m-bottom-sm">
            <br></br>
                <strong>{` ${item.nombre}`}</strong>
                <br></br>
                <br></br><span class="badge badge-success">Asistencia </span>
                <input type="checkbox" name="asistencia" onChange={(e) => checkAsistencia(key,e)  } defaultChecked={item.asistencia ? true: false}/>
            </div>
            </div></td>)
            if(nro%3==0){
                table.push(<tr key={key}>{children}</tr>)
                children = [];
            }
            if(nro==data.length){
                table.push(<tr key={key}>{children}</tr>)
                children = [];
            }
        })

    return (
        <>
            <table class="table" id="dataTableActividad">
                <tbody>{table}</tbody>           
            </table>

        </>
    );
};

export default TableParticipante;