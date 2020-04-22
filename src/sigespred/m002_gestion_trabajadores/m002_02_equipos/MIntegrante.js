import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initAxiosInterceptors} from "../../../config/axios";
import {agregar_equipo, agregar_integrante, detalle_equipo, listar_equipos} from "../../../actions/equipos/Actions";
import {toastr} from "react-redux-toastr";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import Autocomplete from '../../../components/helpers/Autocomplete';

import Autosuggest from 'react-autosuggest';


const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/
let initialEquipos = []

async function cargarResponsablescall() {
    const {data} = await Axios.get(`/brigadistas`);
    return data;
}


async function m_tipointegrante() {
    const {data} = await Axios.get(`/tipointegrante`);
    return data;
}


const MIntegrante = ({closeModalAddIntegrante,equipo_id}) => {


    const [resposables, setResposables] = useState([]);
    const [tipointegrante, setTipointegrante] = useState([]);
    const [integrante, setIntegrante] = useState([]);

    const [asd, asdasd] = useState(false);
    
    /*INGRESANDO A LOS ACTIOS DEL REDUX*/

    const dispatch = useDispatch();
    const detalle_equipo_comp = (equipo_id) => dispatch(detalle_equipo(equipo_id));
    

    const agregar_integrante_action = (integrante) => dispatch(agregar_integrante(integrante));
    /*Efecto para realizar el cargo de los resposablmes*/
    useEffect(() => {
        async function cargarResponsables() {
            try {
                const data = await cargarResponsablescall();
                const data2 = await m_tipointegrante()
                console.log('asdasdas', data)
                setResposables(data);
                setTipointegrante(data2);
                console.log('asdasdas', resposables)
                // setEquipos(equipos);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        cargarResponsables();

    }, [asd, setResposables]);
    
    
/**/

    function handleInputChange(e) {
        setIntegrante({
            ...integrante,
            tipointegrante_id: e.target.value
        });
    }

    function setIntegranteId(idIntegrante) {
        setIntegrante({
            ...integrante,
            integrante_id: idIntegrante
        });
    }

    const saveIntegrante =async  (e) => {


        e.preventDefault();
        try {

            if(!integrante.integrante_id ||integrante.integrante_id==0 ){
                throw {error: " Seleccione un Integrante "}
            }

            if(!integrante.tipointegrante_id ||integrante.tipointegrante_id==0 ){
                throw {error: " Seleccione un Tipo de Integrante "}
            }
            
          //  alert(equipo_id)

        /* await  setIntegrante({
                ...integrante,
             equipo_id: equipo_id
            });*/
            console.log(integrante)
            await agregar_integrante_action({
                ...integrante,
                equipo_id: equipo_id
            });
            detalle_equipo_comp(equipo_id);
            closeModalAddIntegrante()
            
            //listar_equipos_action('');
           // closeModal();
        }catch (e) {
            console.log(e)
            if(!e.error){
                toastr.error(`ERROR !!! Ya existe la configuracion de Integrante Cliente`)
            }else {
                toastr.error(`ERROR !!! ${e.error}`)
            }

        }
        
        
        
        
      
    
    }


    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"
                ></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform: 'scale(1)', alignContent: 'left'}}
                         className="custom-popup light  popup_content popup_content_visible bloqueador2"
                         id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a href="#" onClick={closeModalAddIntegrante} className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width: '1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de equipo de trabajo</h4>
                            </div>
                            <form onSubmit={saveIntegrante}>
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label>Seleccione al nuevo Integrante</label>
                                        <Autocomplete
                                            listaDatos={resposables}

                                            callabck={setIntegranteId}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Tipo de Integrante</label>
                                        <select
                                            required={'required'}
                                            className="form-control input-sm"
                                            name="responsable_id"
                                            onChange={handleInputChange}

                                        >
                                            <option value="0">-- SELECCIONE --</option>

                                            {tipointegrante.map(row =>
                                                <option key={row.id} value={row.id}>{row.denominacion}</option>
                                            )};


                                        </select>
                                    </div>


                                </div>

                                <div className="modal-footer">
                                    <button  type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={closeModalAddIntegrante}  type="button"
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3">

                    </div>
                </div>
            </div>
        </>
    );
};

export default MIntegrante;