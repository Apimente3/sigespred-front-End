import React, {useEffect, useState} from 'react';


const Autocomplete = ({listaDatos, callabck}) => {


    const [seleccionado, setSeleccionado] = useState(false);
    const [listinit, setListinit] = useState(listaDatos);
    const [list, setList] = useState(listaDatos);
    const [rowSelect, setRowSelect] = useState({});


   

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
        setList(
            listaDatos.filter(function (el) {
                return el.value.toLowerCase().indexOf(valor.toLowerCase()) > -1;
            })
        )
        console.log(list)
    }


    const limpiar = (e) => {

        setSeleccionado(false)
        setRowSelect({})
       
        callabck(null)
    }


    return (
        <>

            {!seleccionado ?

                (<div>

                    <input onChange={busquedaItems} type="email" className="form-control input-sm"
                           id="exampleInputEmail1"
                           placeholder=""/>

                    {list.length == 0 || list.length == listinit.length ? null :
                        <div className="btn-group open">
                            <ul className="dropdown-menu">
                                {
                                    list.map(row =>
                                        <li ><a href="#" value={row.id} onClick={saveInput}>
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
                    <br/>
                    <h5>{rowSelect.value}</h5>   <a href="#" onClick={limpiar}  className="btn btn-xs btn-default"><i 
                                                                                          className="fa fa-close"></i>
                </a>
                </>
            }


        </>
    );
};

export default Autocomplete;