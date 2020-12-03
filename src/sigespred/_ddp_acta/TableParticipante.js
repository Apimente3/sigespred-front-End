import React,{useState, useEffect} from 'react';
import {serverFile} from '../../config/axios';

const TableParticipante = ({data=[], checkAsistencia}) => {
        let table = []
        let children = []
        let nro=0;

        data.forEach((item, key) => {
            nro++;
            children.push(<td key={`td_${item.id}`}><div className="list-group-item-text">
            {
                ! item.foto ? <img className="img-circle-pro" src="//dummyimage.com/100x100.jpg" /> : <img src={serverFile+item.foto.path} className="img-circle-pro"></img>
            }
            <div className="pull-left m-left-sm m-bottom-sm">
                <br></br>
                <strong>{` ${item.nombre}`}</strong>
                <br></br>
                <br></br><span className="badge badge-success">Asistencia </span>
                <input key={`input_${item.id}`} type="checkbox" name="asistencia" onChange={(e) => checkAsistencia(key,e)  } defaultChecked={item.asistencia ? true: false}/>
            </div>
            </div></td>)
            if(nro==data.length){
                table.push(<tr key={nro}>{children}</tr>)
                children = [];
            } else if(nro%3==0){
                let keyval = nro;
                table.push(<tr key={keyval}>{children}</tr>)
                children = [];
            }
        })

    return (
        <>
            <table className="table" id="dataTableActividad">
                <tbody>{table}</tbody>           
            </table>

        </>
    );
};

export default TableParticipante;