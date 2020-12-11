import React, {useState} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { toastr } from "react-redux-toastr";
import {Link} from "react-router-dom";
import { Form, FormGroup, Input, Row12, Row6, RowForm, FormFooter, Select } from "../../components/forms";
import Autocomplete from '../../components/helpers/Autocomplete';
import ComboOptions from "../../components/helpers/ComboOptions";
import SingleUpload from "../../components/uploader/SingleUpload";
import { REGISTRO_REQOS_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {useForm} from "../../hooks/useForm";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import {FilesOrdenServicio} from "../../config/parameters";
import MAddEntregable from "./MAddEntregable";
import TableProducto from "./TableProducto";
import MAddActividad from "./MAddActividad";
import TableActividad from "./TableActividad";

const {$} = window;
const Axios = initAxiosInterceptors();

async function getUsuario(dni) {
    const {data} = await Axios.get(`/usuariodni/${dni}`);
    return data;
}

async function addOrden(ordenservicio) {
    const {data} = await Axios.post(`/ordenservicio`,ordenservicio);
    return data;
}

export const OrdenServicioAdd = ({history,  match}) => {
    const listaAreas = useAsync(helperGets.helperGetListaAreas, []);
    const [usuarioMonitor, setUsuarioMonitor] = useState(null);
    const [ordenServicio, setOrdenServicio, handleInputChange, reset ] = useForm({},["nrorequerimiento"]);
    const listaUsuarios = useAsync(helperGets.helperGetListaLocadores, []);
    const [modalProducto, setModalProducto] = useState(false);
    const [modalActividad, setModalActividad] = useState(false);
    const [listaProductos, setListaProductos] = useState([]);
    const [listaActividades, setListaActividades] = useState([]);
    const [productoAdd, setProductoAdd] = useState(null);
    const [actividadAdd, setActividadAdd] = useState(null);

    function setMonitor(idLocador) {
        setUsuarioMonitor(idLocador);
    }

    const cargarEditarProducto = (productoid) => {
        var  productovalue =  listaProductos.find(x => x.id === productoid);
        setProductoAdd(productovalue);
        setModalProducto(true);
    }

    const cargarEditarActividad = (actividadid) => {
        var  actividadvalue =  listaActividades.find(x => x.id === actividadid);
        setActividadAdd(actividadvalue);
        setModalActividad(true);
    }

    const showModalProducto = () => {
        setModalProducto(true);
     }

     const showModalActividad = () => {
        setModalActividad(true);
     }

     const cerrarModal=(estado)=>{
        setProductoAdd(null);
        setModalProducto(estado);
    }

    const cerrarModalActvidad=(estado)=>{
        setActividadAdd(null);
        setModalActividad(estado);
    }

    const updatevaluesproducto=(producto)=>{
        var  productoindex =  listaProductos.findIndex(x => x.id === producto.id);

        if (productoindex >= 0) {
            listaProductos[productoindex].numentregable = producto.numentregable;
            listaProductos[productoindex].numdias = producto.numdias;
            listaProductos[productoindex].porcentajepago = producto.porcentajepago;
            listaProductos[productoindex].detalleentregable = producto.detalleentregable;
           setListaProductos(listaProductos);
        } else {
            setListaProductos([...listaProductos,producto])
        }
        
        setProductoAdd(null);
        setModalProducto(false);
    }

    const updatevaluesactividad=(actividad)=>{
        var  actividadindex =  listaActividades.findIndex(x => x.id === actividad.id);

        if (actividadindex >= 0) {
            listaActividades[actividadindex].descripcionactividad = actividad.descripcionactividad;
            setListaActividades(listaActividades);
        } else {
            setListaActividades([...listaActividades,actividad])
        }
        
        setActividadAdd(null);
        setModalActividad(false);
    }
    
    const deleteProducto = key => {
        var data = $.grep(listaProductos, function(e){
            return e.id !== key;
       });
       setListaProductos(data);
    };

    const deleteActividad = key => {
        var data = $.grep(listaActividades, function(e){
            return e.id !== key;
       });
       setListaActividades(data);
    };

    const buscarProfesional = async () => {
        if (ordenServicio.dniinvitado && ordenServicio.dniinvitado.length === 8){
            let prof= await getUsuario(ordenServicio.dniinvitado);
            
            if (prof) {
                $('#nombreinvitado').val(prof.nombres);
                $('#apellidoinvitado').val(prof.apellidos);
                $('#direccioninvitado').val(prof.direccion);
                ordenServicio.nombreinvitado = prof.nombres;
                ordenServicio.apellidoinvitado = prof.apellidos;
                ordenServicio.direccioninvitado = prof.direccion;
                setOrdenServicio(ordenServicio);
            } else {
                toastr.warning('Búsqueda de Profesional','No se encontró algún profesional con el DNI ingresado', {position: 'top-center'});
            }
        }
    }

    const registrar = async (e) => {
        e.preventDefault();
        
        if (!(Array.isArray(listaProductos) && listaProductos.length)) {
            toastr.warning('Edición de Requerimiento / Orden de Servicio','Se requiere registrar los entregables.', {position: 'top-center'});
            return;
        }
        
        if (!(Array.isArray(listaActividades) && listaActividades.length)) {
            toastr.warning('Edición de Requerimiento / Orden de Servicio','Se requiere registrar las actividades.', {position: 'top-center'});
            return;
        }
        
        ordenServicio.monitorid = usuarioMonitor;
        ordenServicio.Producto = listaProductos;
        ordenServicio.Actividad = listaActividades;

        ordenServicio.Producto.forEach(function(el){ delete el.id });
        ordenServicio.Actividad.forEach(function(el){ delete el.id });

        $('#btnguardar').button('loading');
        try {
        await addOrden(ordenServicio)
        toastr.success("Registro de Requerimiento - O/S", "El Requerimiento se registro correctamente.", {position: "top-center"});
        history.push('/orden-list');
        } catch (e) {
        toastr.error("Registro de Requerimientos", "Se encontro un error: " + JSON.stringify(e), {
            position: "top-center",
        });
        }
        $('#btnguardar').button('reset');
  };

  return (
    <>
      <WraperLarge titleForm={"Registrar Requerimiento / Orden de Servicio"} listbreadcrumb={REGISTRO_REQOS_BREADCRUM} >
        <Form onSubmit={registrar}>
            <RowForm>
                <Row12 title={"Datos del Requerimiento"}>
                    <Row6>
                        <FormGroup label={"Nro. de Requerimiento"} >
                            <Input value={ordenServicio.nrorequerimiento || ""} onChange={handleInputChange}
                                name={"nrorequerimiento"} placeholder={"Ingrese el Nro. de Requerimiento"}
                                type={"text"}>
                            </Input>
                        </FormGroup>
                        <FormGroup label={"Área"} >
                            <Select value={ordenServicio.areaid || ""}
                                onChange={handleInputChange}
                                name={"areaid"}>
                                {listaAreas.result?
                                <ComboOptions data={listaAreas.result} valorkey="id" valornombre="nombre"/>
                                : "Cargando..."}
                            </Select>
                        </FormGroup>
                        <FormGroup label={"Objetivo"} require={true} >
                            <textarea className="form-control input-sm noresize" placeholder="Ingrese el Objetivo del Requerimiento"
                            rows="4" name="objetivo" onChange={handleInputChange} required >
                                {ordenServicio.objetivo || ""}
                            </textarea>
                        </FormGroup>
                    </Row6>
                    <Row6>
                        <FormGroup label={"Coordinador/Monitor"} >
                            {listaUsuarios.result
                            ? <Autocomplete listaDatos={listaUsuarios.result} callabck={setMonitor} />
                            : "Cargando..."}
                        </FormGroup>
                        <FormGroup label={"Duración del Servicio (días)"} require={true} >
                            <input type="number" min="10" max="120" step="1" className="form-control input-sm" 
                                id="duracionservicio" name="duracionservicio" 
                                value={ordenServicio.duracionservicio || ""}
                                placeholder="Ingrese la Duración del Servicio"
                                onChange={handleInputChange} required={true}
                            />
                        </FormGroup>
                        <FormGroup label={"Finalidad Pública"} require={true}>
                            <textarea className="form-control input-sm noresize" placeholder="Ingrese la Finalidad Pública"
                                rows="8" name="finalidadpublica" onChange={handleInputChange} required>
                                {ordenServicio.finalidadpublica || ""}
                            </textarea>
                    </FormGroup>
                    </Row6>
                </Row12>
                <div className="row">
                    <Row6>
                        <FormGroup label={"Monto Total"} require={true}>
                            <Input value={ordenServicio.montosueldo || ""} onChange={handleInputChange}
                                name={"montosueldo"} placeholder={"Ingrese el monto/sueldo total"}
                                pattern="^\d{1,10}(\.\d{1,2})?$" required={true}
                                type={"text"}>
                            </Input>
                        </FormGroup>
                    </Row6>
                    <Row6>
                        <FormGroup label={"Observaciones"} >
                            <Input value={ordenServicio.observaciones || ""} onChange={handleInputChange}
                                name={"observaciones"} placeholder={"Ingrese alguna observación o comentario"}
                                type={"text"}>
                            </Input>
                        </FormGroup>
                    </Row6>
                </div>
                <Row12 title={"Actividades / Alcances"}>
                    <div>
                        <div className="col-lg-10">
                            {(listaActividades && Array.isArray(listaActividades) && listaActividades.length > 0) &&
                            <TableActividad 
                                data={listaActividades}
                                deleteactividad={deleteActividad}
                                editactividad={cargarEditarActividad} >
                            </TableActividad>
                            }
                        </div>
                        <div className="col-lg-2 text-right">
                            <button className="btn btn-sm btn-info" type="button" onClick={showModalActividad}>
                            <i className="fa fa-plus fa-lg" /> Añadir actividad</button>
                        </div>
                    </div>
                </Row12>
                <Row12 title={"Entregables / Productos"}>
                    <div>
                        <div className="col-lg-10">
                            {(listaProductos && Array.isArray(listaProductos) && listaProductos.length > 0) &&
                            <TableProducto 
                                data={listaProductos}
                                deleteproducto={deleteProducto}
                                editproducto={cargarEditarProducto} >
                            </TableProducto>
                            }
                        </div>
                        <div className="col-lg-2 text-right">
                            <button className="btn btn-sm btn-info" type="button" onClick={showModalProducto}>
                            <i className="fa fa-plus fa-lg" /> Añadir Producto</button>
                        </div>
                    </div>
                </Row12>
                <Row12 title={"Datos del Invitado"}>
                        <Row6>
                            <div className="form-group">
                                <label className="col-lg-4 control-label">
                                    DNI del Invitado</label>
                                <div className="col-lg-7">
                                    <Input value={ordenServicio.dniinvitado || ""} onChange={handleInputChange}
                                        name={"dniinvitado"} placeholder={"Ingrese el DNI del invitado"}
                                        pattern="^\d{8}?$" type={"text"}>
                                    </Input>    
                                </div>
                                <div className="col-lg-1">
                                    <a className="btn btn-default btn-sm dropdown-toggle pull-left"
                                        data-toggle="dropdown" data-toggle="tooltip" onClick={buscarProfesional}
                                        data-original-title={`Buscar en Base de Profesionales`}>
                                        <i className="fa fa-refresh"></i>
                                    </a>    
                                </div>
                            </div>
                            {/* <FormGroup label={"DNI del Invitado"} >
                                
                                
                            </FormGroup> */}
                            <FormGroup label={"Nombre del Invitado"} >
                                <Input value={ordenServicio.nombreinvitado || ""} onChange={handleInputChange}
                                    name={"nombreinvitado"} placeholder={"Ingrese el nombre del invitado"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Apelido del Invitado"} >
                                <Input value={ordenServicio.apellidoinvitado || ""} onChange={handleInputChange}
                                    name={"apellidoinvitado"} placeholder={"Ingrese el apellido del invitado"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"RUC del Invitado"} >
                                <Input value={ordenServicio.rucinvitado || ""} onChange={handleInputChange}
                                    name={"rucinvitado"} placeholder={"Ingrese el RUC del invitado"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Digital de TDR"} ayuda="Archivo conteniendo Terminos de Referencia" >
                                <SingleUpload
                                    key="archivotdr"
                                    accept={'.*'}
                                    folderSave={FilesOrdenServicio.FilesOrdenes}
                                    form={ordenServicio}
                                    setForm={setOrdenServicio}
                                    nameUpload={"archivotdr"}
                                        >
                                </SingleUpload>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Dirección del Invitado"} >
                                <Input value={ordenServicio.direccioninvitado || ""} onChange={handleInputChange}
                                    name={"direccioninvitado"} placeholder={"Ingrese la dirección del invitado"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Ingrese el Ubigeo (según DNI)"} >
                                <Input value={ordenServicio.ubigeoinvitado || ""} onChange={handleInputChange}
                                    name={"ubigeoinvitado"} placeholder={"Ingrese el ubigeo de la dirección del invitado"}
                                    pattern="^\d{6}?$"  type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha de Envío de Invitación"} >
                                <Input value={ordenServicio.fechainvitacion || ""} onChange={handleInputChange}
                                    name={"fechainvitacion"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Fecha de Respuesta de Invitación"} >
                                <Input value={ordenServicio.fecharespuesta || ""} onChange={handleInputChange}
                                    name={"fecharespuesta"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Invitación Aceptada"}>
                                <Select value={('aceptacion' in ordenServicio) ? ordenServicio.aceptacion : ""}
                                            onChange={handleInputChange}
                                            name={"aceptacion"}>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                </Select>
                            </FormGroup>
                        </Row6>
                    </Row12>
                    <Row12 title={"Datos de la Orden de Servicio"}>
                        <Row6>
                            <FormGroup label={"Nro. de Orden de Servicio"} >
                                <Input value={ordenServicio.nroordenservicio || ""} onChange={handleInputChange}
                                    name={"nroordenservicio"} placeholder={"Ingrese el Nro. de Orden de Servicio"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Digital de Orden de Servicio"} >
                                <SingleUpload
                                    key="archivoordenservicio"
                                    accept={'.*'}
                                    folderSave={FilesOrdenServicio.FilesOrdenes}
                                    form={ordenServicio}
                                    setForm={setOrdenServicio}
                                    nameUpload={"archivoordenservicio"}
                                        >
                                </SingleUpload>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Fecha de Orden de Servicio"} >
                                <Input value={ordenServicio.fechaordenservicio || ""} onChange={handleInputChange}
                                    name={"fechaordenservicio"}
                                    type={"date"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                    </Row12>
                
            </RowForm>
            <FormFooter>
                <Link to={`/orden-list`} className="btn btn-default btn-sm btn-control">Cancelar</Link>
                <button id="btnguardar" type="submit" className="btn btn-danger btn-sm btn-control">Guardar
                </button>
            </FormFooter>
        </Form>
        {modalProducto && <MAddEntregable closeventana={cerrarModal} usevalue={updatevaluesproducto} 
                            dataproducto={productoAdd}/> }
        {modalActividad && <MAddActividad closeventana={cerrarModalActvidad} usevalue={updatevaluesactividad} 
                            dataactividad={actividadAdd}/> }
      </WraperLarge>
    </>
  );
};