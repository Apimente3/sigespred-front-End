import React, {useState, useEffect} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { toastr } from "react-redux-toastr";
import {Link} from "react-router-dom";
import { Form, FormGroup, Input, Row12, Row6, RowForm, FormFooter, Select } from "../../components/forms";
import Autocomplete from '../../components/helpers/Autocomplete';
import ComboOptionsGroup from "../../components/helpers/ComboOptionsGroup";
import SingleUpload from "../../components/uploader/SingleUpload";
import { LISTADO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {useForm} from "../../hooks/useForm";
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import {FilesOrdenServicio} from "../../config/parameters";
import MAddEntregable from "./MAddEntregable";
import TableProducto from "./TableProducto";

const {$} = window;
const Axios = initAxiosInterceptors();

async function getOrden(id) {
    const {data} = await Axios.get(`/ordenservicio/${id}`);
    return data;
}

async function saveOrden(id, body) {
    const {data} = await Axios.put(`/ordenservicio/${id}`,body);
    return data;
}

export const OrdenServicioEdit = ({history,  match}) => {
    const {id}=match.params;

    const listaSubAreas = useAsync(helperGets.helperGetListaSubAreas, []);
    const [usuarioMonitor, setUsuarioMonitor] = useState(null);
    const [ordenServicio, setOrdenServicio, handleInputChange, reset ] = useForm({},["nrorequerimiento"]);
    const listaUsuarios = useAsync(helperGets.helperGetListaLocadores, []);
    const [modalProducto, setModalProducto] = useState(false);
    const [listaProductos, setListaProductos] = useState([]);
    const [productoEdit, setProductoEdit] = useState(null);

    useEffect(() => {
        const init = async () => {
            let requerimientoOrden= await getOrden(id);
            setOrdenServicio(requerimientoOrden)
            setUsuarioMonitor(requerimientoOrden.monitorid);

            if(requerimientoOrden.Producto){
                setListaProductos(requerimientoOrden.Producto);
            }
        };
        init();
    }, []);

    function setMonitor(idLocador) {
        setUsuarioMonitor(idLocador);
    }

    const cargarEditarProducto = (ordenservicioid) => {
        var  titularvalue =  listaProductos.find(x => x.id === ordenservicioid);
        setProductoEdit(titularvalue);
        setModalProducto(true);
    }

    const showModalProducto = () => {
        setModalProducto(true);
     }

     const cerrarModal=(estado)=>{
        setProductoEdit(null);
        setModalProducto(estado);
    }

    const updatevaluesproducto=(producto)=>{
        var  titularindex =  listaProductos.findIndex(x => x.id === producto.id);

        if (titularindex >= 0) {
            listaProductos[titularindex].numentregable = producto.numentregable;
            listaProductos[titularindex].numdias = producto.numdias;
            listaProductos[titularindex].porcentajepago = producto.porcentajepago;
            listaProductos[titularindex].detalleentregable = producto.detalleentregable;
           setListaProductos(listaProductos);
        } else {
            setListaProductos([...listaProductos,producto])
        }
        
        setProductoEdit(null);
        setModalProducto(false);
    }
    
    const deleteProducto = key => {
        var data = $.grep(listaProductos, function(e){
            return e.id !== key;
       });
       setListaProductos(data);
    };

    const actualizar = async e => {
        e.preventDefault();
    
        ordenServicio.monitorid = usuarioMonitor;
        ordenServicio.producto = listaProductos;

        $('#btnguardar').button('loading');
    
        try {
            await saveOrden(id, ordenServicio)
            toastr.success(`Actualización de Requerimiento - O/S: ${id}`, 'Se actualizó correctamente.', {position: 'top-center'});
            history.push('/orden-list');
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar actualizar', JSON.stringify(e), {position: 'top-center'});
        }
        $('#btnguardar').button('reset');
    }

    return (
        <>
        <WraperLarge titleForm={"Editar Requerimiento / Orden de Servicio"} listbreadcrumb={LISTADO_PARTIDA_BREADCRUM} >
            <Form onSubmit={actualizar}>
                <RowForm>
                    <Row12 title={"Datos del Requerimiento"}>
                        <Row6>
                            <FormGroup label={"Nro. de Requerimiento"} require={true}>
                                <Input value={ordenServicio.nrorequerimiento || ""} onChange={handleInputChange}
                                    name={"nrorequerimiento"} placeholder={"Ingrese el Nro. de Requerimiento"}
                                    required={true} type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Área"} >
                                <Select value={ordenServicio.areaid || ""}
                                    onChange={handleInputChange}
                                    name={"areaid"}>
                                    {listaSubAreas.result ? (
                                    <ComboOptionsGroup
                                    data={listaSubAreas.result}
                                    valorkey="id"
                                    valornombre="nombre"
                                    valornombregrupo="nombre"
                                    grupojson="SubArea"
                                    />
                                    ) : "Cargando..."}
                                </Select>
                            </FormGroup>
                            <FormGroup label={"Objetivo"} >
                                <textarea className="form-control input-sm noresize" placeholder="Ingrese el Objetivo del Requerimiento"
                                rows="4" name="objetivo" onChange={handleInputChange} 
                                value={ordenServicio.objetivo || ""}
                                >
                                </textarea>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"Coordinador/Monitor"} >
                                {listaUsuarios.result
                                ? <Autocomplete listaDatos={listaUsuarios.result} callabck={setMonitor}  valorinit={ordenServicio.monitorid}/>
                                : "Cargando..."}
                            </FormGroup>
                            <FormGroup label={"Duración del Servicio (días)"} >
                                <input type="number" min="10" max="120" step="1" className="form-control input-sm" 
                                    id="duracionservicio" name="duracionservicio" 
                                    value={ordenServicio.duracionservicio || ""}
                                    placeholder="Ingrese la Duración del Servicio"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup label={"Finalidad Pública"} >
                                <textarea className="form-control input-sm noresize" placeholder="Ingrese la Finalidad Pública"
                                    rows="8" name="finalidadpublica" onChange={handleInputChange} 
                                    value={ordenServicio.finalidadpublica || ""}
                                    >
                                </textarea>
                        </FormGroup>
                        </Row6>
                    </Row12>
                    <div className="row">
                        <Row6>
                            <FormGroup label={"Monto Total"} >
                                <Input value={ordenServicio.montosueldo || ""} onChange={handleInputChange}
                                    name={"montosueldo"} placeholder={"Ingrese el monto/sueldo total"}
                                    pattern="^\d{1,10}(\.\d{1,2})?$"
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
                            <FormGroup label={"DNI del Invitado"} >
                                <Input value={ordenServicio.dniinvitado || ""} onChange={handleInputChange}
                                    name={"dniinvitado"} placeholder={"Ingrese el DNI del invitado"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
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
                            dataproducto={productoEdit}/> }
        </WraperLarge>
        </>
  );
};