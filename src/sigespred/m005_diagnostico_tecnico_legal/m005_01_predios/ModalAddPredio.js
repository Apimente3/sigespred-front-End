import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {agregar, listar} from "../../../actions/predios/Actions";
import {toastr} from 'react-redux-toastr'
import {initAxiosInterceptors} from "../../../config/axios";
import Map from "../../../components/helpers/maps/MapPredio";
import MapProyectoEmpy from "../../../components/helpers/maps/MapProyectoEmpy";
const Axios = initAxiosInterceptors();

async function getsolicitudGestionPredial(cod_proy) {
    const {data} = await Axios.get(`/drpsolicituds-proy?codigo_proyecto=${cod_proy}`);
    return data;
}

/*Trae el polygono de la capa de repositorio de polygonos*/
async function getPolygonoServer(codigo) {
    const {data} = await Axios.get(`/obtener_poligono_predio?idcapa=1&codigo=${codigo}`);
    // let result = JSON.parse(data[0].geojson_3857);
    return data;
}


 
const ModalAddPredio = ({closeModal,proyecto}) => {

    const [predio, setPredio] = useState({});
    const [solicituds, set_solicituds] = useState([]);

    const dispatch = useDispatch();
    const agregarAction = (pred) => dispatch(agregar(pred));


    const listar_action = (busqueda) => dispatch(listar(busqueda));
/*Funciona de inicalizacion de los combos */
    useEffect(() => {
        const init=async ()=>{

            let listsolicituds=await getsolicitudGestionPredial(proyecto);
            set_solicituds(listsolicituds);
        };
        init();


    }, []);

    /*FUncion que guarda el objeto predio*/
    function handleInputChange(e) {
        
        if(e.target.name=='codigo'){
            e.target.value= e.target.value.toUpperCase();
        }
        setPredio({
            ...predio,
            [e.target.name]: e.target.value
        });
    } 
    
    const registrar= async (e)=>{
        e.preventDefault();
        try{
            const response=await agregarAction({...predio,codigo_proyecto:proyecto});
            closeModal()
            listar_action(proyecto)
        }catch (e) {
        
            toastr.error('ERROR !!! el codigo ingresado ya existe.') 
        }
       
        
    }

    async function getPolygono(codigo) {
        setPredio({
            ...predio,
            polygono: undefined
        });
        try {
            let geojson = await getPolygonoServer(codigo);
            setPredio({
                ...predio,
                polygono: geojson.features[0].geometry,polygonojson:geojson
            });
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica')
        } catch (e) {
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
                        <a onClick={closeModal} href="#"  className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width:'1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de Predio</h4>
                            </div>
                            <form onSubmit={registrar}>
                                <div className="modal-body">
                                    
                                    <div className="form-group">
                                        <label>Código del Predio</label>
                                        <input    
                                            required={'required'} 
                                            type="text" 
                                            className="form-control input-sm" 
                                            placeholder="Ingrese el código unico del Predio."
                                            
                                            name="codigo"
                                            onChange={handleInputChange}
                                            value={predio.codigo}

                                            onBlur={() => {
                                                getPolygono(predio.codigo)
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese la descripcion del Predios"
                                            name="descripcion"
                                            onChange={handleInputChange}
                                            value={predio.descripcion}
                                        />
                                    </div>

                                   
                            


                                </div>

                                <div className="modal-footer">
                                    {predio.polygono ?
                                        <button id="btnguardar"  type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>:
                                        <button id="btnguardar" disabled type="submit"
                                                className="btn btn-danger btn-sm btn-control">Guardar
                                        </button>}
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-1 control-label"></label>
                                    <div className="col-lg-12">
                                        {predio.polygono ? <Map geojson={predio.polygono}/> :
                                            <MapProyectoEmpy></MapProyectoEmpy>}


                                    </div>
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

export default ModalAddPredio;