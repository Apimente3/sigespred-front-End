import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initAxiosInterceptors} from "../../../config/axios";
import {agregar_equipo,listar_equipos} from "../../../actions/equipos/Actions";
import {toastr} from "react-redux-toastr";
const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/
let initialEquipos = []

async function cargarResponsablescall() {
    const {data: {responsables, equipos}} = await Axios.get(`/responsables`);
    initialEquipos = equipos;
    return {responsables, equipos};
}



const MvisitaCampo = ({closeAddEquipos}) => {

    const dispatch = useDispatch();
    const agregar_equipo_action = (equipo) => dispatch(agregar_equipo(equipo));
    const listar_equipos_action = (b) => dispatch(listar_equipos(b));

    const [resposables, setResposables] = useState([]);
    const [equipo, setEquipo] = useState([]);

    /*Efecto para realizar el cargo de los resposablmes*/
    useEffect(() => {
        async function cargarResponsables() {
            try {
                const {responsables, equipos} = await cargarResponsablescall();
                setResposables(responsables);
               // setEquipos(equipos);
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        cargarResponsables();

    }, []);


    function handleInputChange(e) {

        setEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        });
    }
    
    const closeModal=()=>{
      
        closeAddEquipos(false)
    }
    
    const addEquipos= async (e)=>{
        e.preventDefault();
        try {
            if(!equipo.responsable_id ||equipo.responsable_id==0 || equipo.responsable_id=='0'){
                throw {error: " Seleccione un responsable del proyecto "}
            }
            await  agregar_equipo_action(equipo);
            listar_equipos_action('');
            closeModal();
        }catch (e) {
            console.log(e)
            if(!e.error){
                toastr.error(`ERROR !!! Ya existe esa DENOMINACION en los EQUIPOS`)
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
                    <div style={{transform:'scale(1)',alignContent:'left'}} className="custom-popup light  popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a href="#"  className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width:'1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de equipo de trabajo</h4>
                            </div>
                            <form onSubmit={addEquipos}>
                            <div className="modal-body">
                             
                                    <div className="form-group">
                                        <label>Equipo de Trabajo</label>
                                        <input    name="denominacion"
                                                  onChange={handleInputChange} value={equipo.denominacion} required={'required'} type="text" className="form-control input-sm" placeholder="Ingrese el nombre del equipo."/>
                                    </div>
                               
                                    <div className="form-group">
                                        <label>Responsable del Equipo</label>
                                        <select
                                            required={'required'}
                                            className="form-control input-sm"
                                            name="responsable_id"
                                            onChange={handleInputChange}

                                        >
                                            <option value="0">-- SELECCIONE --</option>


                                            {resposables.map(resp =>
                                                <option key={resp.id} value={resp.id}>{resp.responsable}</option>
                                            )};

                                        </select>
                                    </div>
                                  

                              
                            </div>

                            <div className="modal-footer">
                                <button id="btnguardar" type="submit"
                                        className="btn btn-danger btn-sm btn-control">Guardar
                                </button>
                                <button onClick={closeModal} type="button"
                                        className="btn btn-default btn-sm btn-control">Cancelar
                                </button>
                            </div>
                        </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3" >

                    </div>
                </div>
            </div>
        </>
    );
};

export default MvisitaCampo;