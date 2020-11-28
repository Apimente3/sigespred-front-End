import React, {useState, useEffect} from "react";
import {initAxiosInterceptors} from '../../config/axios';
import { EDICION_PREDIOS_BREADCRUM } from "../../config/breadcrums";
import {Link} from "react-router-dom";
import {toastr} from 'react-redux-toastr'
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {
    Form,
    FormGroup,
    Row6,
    Row12,
    RowForm,
    Select,
    Input,
    Options,
    FormControl,
    InputInline,
    FormFooter
} from "../../components/forms";
import {useForm} from "../../hooks/useForm"
import { useAsync } from "react-async-hook";
import * as helperGets from "../../components/helpers/LoadMaestros";
import * as PARAMS from "../../config/parameters";
import ComboOptions from "../../components/helpers/ComboOptions";
import PredioLinks from "./PredioLinks";
import {useDispatch} from 'react-redux';
import { actualizar } from '../../actions/_ddp_variable/Actions';
import MAddTitularPredio from "./MAddTitularPredio";
import TableTitularPredio from "./TableTitularPredio";

const {$} = window;
const Axios = initAxiosInterceptors();

async function getDatoReg(id) {
    const {data} = await Axios.get(`/predioreg/${id}`);
    return data;
}

async function saveDatoReg(id, body) {
    const {data} = await Axios.put(`/predioreg/${id}`,body);
    return data;
}

async function addDatoReg(respuesta) {
    const {data} = await Axios.post(`/predioreg`,respuesta);
    return data;
}

const PredioEditReg = ({history,  match}) => {
    const {id} = match.params;
    const {codpred}=match.params;

    const [predioReg, setPredioReg, handleInputChange, reset ] = useForm({},["cuc"]);
    const [nuevoDatoReg, setNuevoDatoReg] = useState(true);
    const [modalTitular, setModalTitular] = useState(false);
    const [listaTitulares, setListaTitulares] = useState([]);
    const [titularEdit, setTitularEdit] = useState(null);
    const [mandatorioInscripcion, setMandatorioInscripcion] = useState(false);
    const listaTipoCarga = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PREDIOTIPOCARGA]);
    const listaTipoPersona = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PREDIOTIPOPERSONA]);
    const listaTipoPersonaJuridica = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PREDIOTIPOPERSONAJURI]);
    const listaTipoTitularidad = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.PREDIOTIPOCONDTITULAR]);
    const listaTipoDocumento = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPODOC]);
    const listaEstadoCivil = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.ESTADOCIVIL]);
    const listaTipoAdquisicion = useAsync(helperGets.helperGetListDetalle, [PARAMS.LISTASIDS.TIPOADQUISICION]);

    useEffect(() => {
        const init = async () => {
            
            let datoRegistral= await getDatoReg(id);
            if (datoRegistral) {
                setNuevoDatoReg(false);
                setPredioReg(datoRegistral);
                setValorMandatorio(datoRegistral.inscrito);
                if (datoRegistral.titularpredio) {
                    setListaTitulares(datoRegistral.titularpredio);
                }
            }
        };
        init();
    }, []);

    const handleChangeMandatorio = (e) => {
        setValorMandatorio(e.target.value);
    }

    const setValorMandatorio= (valor) => {
        
        if ((typeof(valor) === 'string' && valor == 'true') || (typeof(valor) === 'boolean' && valor === true)){
            setMandatorioInscripcion(true);
            return;
        }
        
        setMandatorioInscripcion(false);
    }

    const cargarEditarTitular = (titularid) => {
        var  titularvalue =  listaTitulares.find(x => x.id === titularid);
        setTitularEdit(titularvalue);
        setModalTitular(true);
    }

    const showModalTitular = () => {
        setModalTitular(true);
     }

     const cerrarModal=(estado)=>{
        setTitularEdit(null);
        setModalTitular(estado);
    }

    const updatevaluestitular=(titular)=>{
        var  titularindex =  listaTitulares.findIndex(x => x.id === titular.id);

        if (titularindex >= 0) {
            listaTitulares[titularindex].nombretitular = titular.nombretitular;
            listaTitulares[titularindex].tipodocumento = titular.tipodocumento;
            listaTitulares[titularindex].numerodocumento = titular.numerodocumento;
            listaTitulares[titularindex].estadocivil = titular.estadocivil;
           setListaTitulares(listaTitulares);
        } else {
            setListaTitulares([...listaTitulares,titular])
        }
        
        setTitularEdit(null);
        setModalTitular(false);
    }
    
    const deleteTitular = key => {
        var data = $.grep(listaTitulares, function(e){
            return e.id !== key;
       });
       setListaTitulares(data);
    };

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        predioReg.titularpredio = listaTitulares;

        try {
            if (nuevoDatoReg) {
                predioReg.id = id;
                await addDatoReg(predioReg);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se generarón correctamente.', {position: 'top-center'})
            } else {
                await saveDatoReg(predioReg.id, predioReg);
                toastr.success(`Los datos registrales del predio: ${id}`, 'Se actualizarón correctamente.', {position: 'top-center'})
            }
        }
        catch (e) {
            toastr.error('Se encontrarón errores al intentar realizar el registro de datos registrales', JSON.stringify(e), {position: 'top-right'})
        }

        $('#btnguardar').button('reset');
    }

    return (
        <>
            <WraperLarge titleForm={"PREDIO: " + codpred + " / DATOS REGISTRALES"} listbreadcrumb={EDICION_PREDIOS_BREADCRUM} >
                <PredioLinks active="3"></PredioLinks>
                <Form onSubmit={registrar}>
                    <div className="mtop-35"></div>
                    <RowForm>
                        <Row6>
                            <FormGroup label={"Código de Referencia Catastral"}>
                                <Input value={predioReg.codcatastral || ""} onChange={handleInputChange}
                                    name={"codcatastral"} placeholder={"Ingrese el código de referencia catastral"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"¿Tiene Derecho Inscrito?"}>
                                <Select value={('inscrito' in predioReg) ? predioReg.inscrito : ""}
                                            onChange={(e) => {handleChangeMandatorio(e); handleInputChange(e);}}
                                            name={"inscrito"}>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                </Select>
                            </FormGroup>
                        </Row6>
                        <Row6>
                            <FormGroup label={"CUC"} ayuda="Código Único Catastral">
                                <Input value={predioReg.cuc || ""} onChange={handleInputChange}
                                    name={"cuc"} placeholder={"Ingrese el valor del CUC"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Número de ITL"} ayuda="Número de Informe Técnico Legal">
                                <Input value={predioReg.numeroitl || ""} onChange={handleInputChange}
                                    name={"numeroitl"} placeholder={"Ingrese el número de informe"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos y Documentos de Inscripción</legend>
                                <Row6>
                                    <FormGroup label={"Fecha de Inscripción"} require={mandatorioInscripcion}>
                                        <Input value={predioReg.fechainscripcion || ""} onChange={handleInputChange}
                                            name={"fechainscripcion"} required={mandatorioInscripcion}
                                            type={"date"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Asiento"} >
                                        <Input value={predioReg.numeroasiento || ""} onChange={handleInputChange}
                                        name={"numeroasiento"} placeholder={"Ingrese el número de asiento"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Tomo"} >
                                        <Input value={predioReg.numerotomo || ""} onChange={handleInputChange}
                                        name={"numerotomo"} placeholder={"Ingrese el número de tomo"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Partida Electrónica"} require={mandatorioInscripcion}>
                                        <Input value={predioReg.numeropartida || ""} onChange={handleInputChange}
                                        name={"numeropartida"} placeholder={"Ingrese el número de partida"}
                                        required={mandatorioInscripcion}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Título Archivado"} >
                                        <Input value={predioReg.numerotituloarc || ""} onChange={handleInputChange}
                                        name={"numerotituloarc"} placeholder={"Ingrese el número de Título Archivado"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <div class="form-group ">
                                        {mandatorioInscripcion?
                                        <label className="col-lg-4 control-label"><span className="obligatorio">* </span>Área Inscrita - m<sup>2</sup></label>
                                        :<label className="col-lg-4 control-label">Área Inscrita - m<sup>2</sup></label>
                                        }
                                        <div className="col-lg-8">
                                            <Input value={predioReg.areainscrita || ""} onChange={handleInputChange}
                                                name={"areainscrita"} placeholder={"Ingrese el valor de área inscrita"}
                                                pattern="^\d{1,10}(\.\d{1,6})?$"
                                                required={mandatorioInscripcion}
                                                type={"text"}>
                                            </Input>
                                        </div>
                                    </div>
                                    <FormGroup label={"Número de Folio"} >
                                        <Input value={predioReg.numerofolio || ""} onChange={handleInputChange}
                                        name={"numerofolio"} placeholder={"Ingrese el número de folio"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Ficha"} >
                                        <Input value={predioReg.numeroficha || ""} onChange={handleInputChange}
                                        name={"numeroficha"} placeholder={"Ingrese el número de ficha"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Código Predio Registral"} >
                                        <Input value={predioReg.codpredioregistral || ""} onChange={handleInputChange}
                                        name={"codpredioregistral"} placeholder={"Ingrese el Código de Predio Registral"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                            </fieldset>
                        </div>
                        
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend></legend>
                                <Row6>
                                    <FormGroup label={"Fecha de Inscripción de Fábrica"} >
                                        <Input value={predioReg.fechainscripcionfabrica || ""} onChange={handleInputChange}
                                            name={"fechainscripcionfabrica"}
                                            type={"date"}>
                                        </Input>
                                    </FormGroup>
                                    <div class="form-group ">
                                        <label className="col-lg-4 control-label">Área Construida - m<sup>2</sup></label>
                                        <div className="col-lg-8">
                                            <Input value={predioReg.fabareaconstruida || ""} onChange={handleInputChange}
                                                name={"fabareaconstruida"} placeholder={"Ingrese el valor de área dispuesta"}
                                                pattern="^\d{1,10}(\.\d{1,6})?$"
                                                type={"text"}>
                                            </Input>
                                        </div>
                                    </div>
                                    <FormGroup label={"Número de Folio"} >
                                        <Input value={predioReg.fabnumerofolio || ""} onChange={handleInputChange}
                                        name={"fabnumerofolio"} placeholder={"Ingrese el número de folio"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Ficha"} >
                                        <Input value={predioReg.fabnumeroficha || ""} onChange={handleInputChange}
                                        name={"fabnumeroficha"} placeholder={"Ingrese el número de ficha"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"Número de Fábrica"} >
                                        <Input value={predioReg.numerofabrica || ""} onChange={handleInputChange}
                                        name={"numerofabrica"} placeholder={"Ingrese el número de Título Archivado"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Asiento"} >
                                            <Input value={predioReg.fabnumeroasiento || ""} onChange={handleInputChange}
                                                name={"fabnumeroasiento"} placeholder={"Ingrese el número de asiento"}
                                                type={"text"}>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Tomo"} >
                                        <Input value={predioReg.fabnumerotomo || ""} onChange={handleInputChange}
                                        name={"fabnumerotomo"} placeholder={"Ingrese el número de tomo"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup label={"Número de Partida Electrónica"} >
                                        <Input value={predioReg.fabnumeropartida || ""} onChange={handleInputChange}
                                        name={"fabnumeropartida"} placeholder={"Ingrese el número de partida"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                            </fieldset>
                        </div>
                        
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos de Anotaciones Preventivas, Cargas y Gravámenes (Activas){predioReg.anotacionpreventiva && predioReg.anotacionpreventiva.toString()}{predioReg.gravamen}</legend>
                                
                                <Row6>
                                    <FormGroup label={"¿Tiene Anotación Preventiva?"} require={true}>
                                        <Select value={('anotacionpreventiva' in predioReg) ? predioReg.anotacionpreventiva : ""}
                                                    onChange={handleInputChange} required={true}
                                                    name={"anotacionpreventiva"}>
                                                <option value="true">Sí</option>
                                                <option value="false">No</option>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Tipo de Carga (Si Aplica)"} require={true}>
                                        <Select value={predioReg.tipocarga || ""}
                                                    onChange={handleInputChange} required={true}
                                                    name={"tipocarga"}>
                                            {listaTipoCarga.result?
                                            <ComboOptions data={listaTipoCarga.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"¿Tiene Gravamen?"} require={true}>
                                        <Select value={('gravamen' in predioReg) ? predioReg.gravamen : ""}
                                                    onChange={handleInputChange} required={true}
                                                    name={"gravamen"}>
                                                <option value="true">Sí</option>
                                                <option value="false">No</option>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Detalle de Carga"} >
                                        <Input value={predioReg.cargadetalle || ""} onChange={handleInputChange}
                                        name={"cargadetalle"} placeholder={"Ingrese el detalle de la carga"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                            </fieldset>
                        </div>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos de Titularidad del Predio</legend>
                                <Row6>
                                    <FormGroup label={"Tipo del Titular de Propiedad"}>
                                        <Select value={predioReg.tipotitular || ""}
                                                    onChange={handleInputChange}
                                                    name={"tipotitular"}>
                                            {listaTipoPersona.result?
                                            <ComboOptions data={listaTipoPersona.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Condición del Titular de Propiedad"}>
                                        <Select value={predioReg.condiciontitular || ""}
                                                    onChange={handleInputChange}
                                                    name={"condiciontitular"}>
                                            {listaTipoTitularidad.result?
                                            <ComboOptions data={listaTipoTitularidad.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"Tipo de Persona Jurídica"}>
                                        <Select value={predioReg.tipopersonajuri || ""}
                                                    onChange={handleInputChange}
                                                    name={"tipopersonajuri"}>
                                            {listaTipoPersonaJuridica.result?
                                            <ComboOptions data={listaTipoPersonaJuridica.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                                </Row6>
                                <div className="col-lg-12">
                                    <fieldset className="mleft-20 mbot-20">
                                        <legend>Titular(es) del Predio</legend>
                                        <div>
                                            <div className="col-lg-10">
                                                {(listaTitulares && Array.isArray(listaTitulares) && listaTitulares.length > 0) &&
                                                <TableTitularPredio 
                                                    data={listaTitulares}
                                                    deletetitular={deleteTitular}
                                                    edittitular={cargarEditarTitular} >
                                                </TableTitularPredio>
                                                }
                                            </div>
                                            <div className="col-lg-2 text-right">
                                                <button className="btn btn-sm btn-info" type="button" onClick={showModalTitular}>
                                                <i className="fa fa-plus fa-lg" /> Añadir Titular</button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </fieldset>
                        </div>
                        <div className="col-lg-12">
                            <fieldset className="mleft-20">
                                <legend>Datos de Forma de Adquisición del Predio</legend>
                                <Row6>
                                    <FormGroup label={"Forma de Adquisición"}>
                                        <Select value={predioReg.formaadquisicion || ""}
                                                    onChange={handleInputChange}
                                                    name={"formaadquisicion"}>
                                            {listaTipoAdquisicion.result?
                                            <ComboOptions data={listaTipoAdquisicion.result} valorkey="id" valornombre="valortexto"/>
                                            : "Cargando..."}
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label={"Fecha de Emisión del Documento"} >
                                        <Input value={predioReg.fechadocumentoacredita || ""} onChange={handleInputChange}
                                            name={"fechadocumentoacredita"}
                                            type={"date"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                                <Row6>
                                    <FormGroup label={"Documento de Acreditación"} >
                                        <Input value={predioReg.documentoacredita || ""} onChange={handleInputChange}
                                        name={"documentoacredita"} placeholder={"Ingrese los detalles del documento"}
                                        type={"text"}>
                                        </Input>
                                    </FormGroup>
                                </Row6>
                            </fieldset>
                        </div>
                    </RowForm>
                    <FormFooter>
                        <Link to={`/predio-list`}
                            className="btn btn-default btn-sm btn-control">Cancelar</Link>
                        <button id="btnguardar" type="submit"
                                className="btn btn-danger btn-sm btn-control">Guardar
                        </button>
                    </FormFooter>
                </Form>
                {modalTitular && <MAddTitularPredio closeventana={cerrarModal} usevalue={updatevaluestitular} 
                            listatipodoc={listaTipoDocumento.result} listaestadocivil={listaEstadoCivil.result} datatitular={titularEdit}/> }
            </WraperLarge>
        </>
  );
};

export default PredioEditReg;