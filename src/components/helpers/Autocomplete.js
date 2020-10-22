import { fireEvent } from '@testing-library/react';
import React, {useEffect, useState} from 'react';

const Autocomplete = ({listaDatos, callabck, valorinit}) => {

    const [seleccionado, setSeleccionado] = useState(false);
    const [listinit, setListinit] = useState(listaDatos);
    const [list, setList] = useState(listaDatos);
    const [rowSelect, setRowSelect] = useState({});
    const [fisrtLoad, setfisrtLoad] = useState(true);
    const [valorBuscar, setValorBuscar] = useState('');

    useEffect(() => {
        async function initialLoad() {
            try {
                if (valorinit && fisrtLoad) {
                    var found = await listaDatos.find(function (element) {
                        return element.id == valorinit;
                    });
                    setRowSelect(found);
                    setSeleccionado(true);
                    setfisrtLoad(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
    }, []);

    const saveInput = async (e) => {
        let id = e.target.getAttribute('value');
        var found = await listaDatos.find(function (element) {
            return element.id == id;
        });
        setRowSelect(found);
        setSeleccionado(true);
        callabck(found.id);
    }

    const busquedaItems = (e) => {
        let valor = e.target.value;
        setValorBuscar(valor);
        setList(
            listaDatos.filter(function (el) {
                return el.value.toLowerCase().indexOf(valor.toLowerCase()) > -1;
            })
        )
    }

    const limpiar = (e) => {
        setValorBuscar('');
        setSeleccionado(false)
        setRowSelect({})
       
        callabck(null)
    }

    return (
        <>
            {(!seleccionado) ?
                (<div>
                    <input onChange={busquedaItems} type="email" className="form-control input-sm"
                           id="exampleInputEmail1"
                           placeholder=""/>
                    {!valorBuscar || list.length == 0 || list.length == listinit.length ? null :
                        <div className="btn-group open">
                            <ul className="dropdown-menu">
                                {
                                    list.map(row =>
                                        <li key={row.id} ><a href="#" value={row.id} onClick={saveInput}>
                                            {row.value}
                                        </a></li>
                                    )
                                }
                            </ul>
                        </div>
                    }
                </div>)
                :
                <>
                    {rowSelect.value} <a href="#" onClick={limpiar}  className="btn btn-xs btn-default"><i className="fa fa-close"></i>
                </a>
                </>
            }
        </>
    );
};

export default Autocomplete;