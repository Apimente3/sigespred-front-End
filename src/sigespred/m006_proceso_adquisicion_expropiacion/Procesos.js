import React, {useEffect, useState} from 'react';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import Header from "../m000_common/headers/Header";
import {toastr} from "react-redux-toastr";
import UploadFile from "../../components/helpers/uploaders/UploadExpFiles";
import {initAxiosInterceptors} from "../../config/axios";


import createRowData from "./CreateRowData"

const Axios = initAxiosInterceptors();

async function save(filesexpediente) {
    const {data} = await Axios.post(`/save_filesexpediente`, filesexpediente);
    return data;
}

async function getFiles(codigo_expediente) {
    const {data} = await Axios.get(`/list_filesexpediente?codigo_expediente=` + codigo_expediente);
    return data;
}


const Procesos = ({match}) => {
    const {expediente: exp} = match.params;
    //alert(exp);

    const [files_expediente, set_files_expediente] = useState({
        codigo_expediente: exp,
        documento1: '',
        documento2: '',
        documento3: '',
        documento4: '',
        documento5: '',
        documento6: '',
        documento7: '',
        documento8: '',
        documento9: '',
        documento10: '',
        documento11: '',
        documento12: '',
        documento13: '',
    });
    const [stateexpediente, set_stateexpediente] = useState(exp);


    useEffect(() => {
        const init = async () => {
            //alert(exp)
            let list = await getFiles(exp);
            console.log(list);
            set_files_expediente({...files_expediente,...list});
            // set_files_expediente(getFiles(exp))
        };
        init();
    }, []);


    const savefile = (statename, filesaved) => {
        set_files_expediente({
            ...files_expediente,
            [statename]: filesaved.filename
        });
    }

    const guardarFilesExp = async () => {
        try {
            await save(files_expediente);
            toastr.info('Se guardo correctamente los archivos')
        } catch (e) {
            alert(e.error)
        }
    }


    /*Creacion de tabla as*/

    const columns=[
        {key:'id',name:"ID",editable:true}
    ]

    return (
        <>


            <Header></Header>
            <div id="wrapper" className="preload">


                <div id="main-container" style={{padding: '20px', marginLeft: '0px', marginTop: '55px'}}>
                    <div id="breadcrumb">
                        <ul className="breadcrumb">
                            <li><i className="fa fa-home"></i><a href="index.html"> Proyecto</a></li>
                            <li className="active">Predio</li>
                            <li className="active">Expediente:{stateexpediente}</li>
                        </ul>
                    </div>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard1" noValidate="">
                            <div className="panel-heading">

                            </div>
                            <div className="panel-tab">
                                <ul className="wizard-steps wizard-demo" id="wizardDemo1">
                                    <li className="active">
                                        <a href="#wizardContent1" data-toggle="tab"> PROCESO DE ADQUISICION Y
                                            EXPROPIACION -> {stateexpediente}</a>
                                    </li>

                                </ul>
                            </div>

                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="wizardContent1">
                                        <div className="form-group">
                                                <label className="control-label col-lg-2">1. OFICIO DE INICIO DE
                                                    ADQUISICION</label>
                                            <div className="col-lg-6">

                                                {files_expediente.documento1.length !== 0 ?
                                                    <UploadFile name={'documento1'} key="documento1"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento1,
                                                                    originalName: files_expediente.documento1
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento1'} key="upload_documento_rspta"
                                                                file={files_expediente.documento1}
                                                                setFile={savefile}></UploadFile>
                                                }


                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">2. INSCRIPCION DE ANOTACION
                                                PREVENTIVA</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento2.length !== 0 ?
                                                    <UploadFile name={'documento2'} key="documento2"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento2,
                                                                    originalName: files_expediente.documento2
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento2'} key="upload_documento_rspta"
                                                                file={files_expediente.documento2}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">3. CERTIFICADO DE BUSQUEDA
                                                CATASTRAL</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento3.length !== 0 ?
                                                    <UploadFile name={'documento3'} key="documento3"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento3,
                                                                    originalName: files_expediente.documento3
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento3'} key="upload_documento_rspta"
                                                                file={files_expediente.documento3}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">4. INFORME DE TASACION
                                                MVSC</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento4.length !== 0 ?
                                                    <UploadFile name={'documento4'} key="documento4"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento4,
                                                                    originalName: files_expediente.documento4
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento4'} key="upload_documento_rspta"
                                                                file={files_expediente.documento4}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">5. OFICIO INTENCION
                                                ADQUISICIONES</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento5.length !== 0 ?
                                                    <UploadFile name={'documento5'} key="documento5"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento5,
                                                                    originalName: files_expediente.documento5
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento5'} key="upload_documento_rspta"
                                                                file={files_expediente.documento5}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">6. CARTA DE INTENCION DE
                                                ACEPTACION</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento6.length !== 0 ?
                                                    <UploadFile name={'documento6'} key="documento6"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento6,
                                                                    originalName: files_expediente.documento6
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento6'} key="upload_documento_rspta"
                                                                file={files_expediente.documento6}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-lg-2">7. RM QUE APRUEBA VALOR DE
                                                TASACION</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento7.length !== 0 ?
                                                    <UploadFile name={'documento7'} key="documento7"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento7,
                                                                    originalName: files_expediente.documento7
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento7'} key="upload_documento_rspta"
                                                                file={files_expediente.documento7}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-lg-2">8. RESOLUCION PUBLICADA EN EL
                                                PERUANO</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento8.length !== 0 ?
                                                    <UploadFile name={'documento8'} key="documento8"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento8,
                                                                    originalName: files_expediente.documento8
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento8'} key="upload_documento_rspta"
                                                                file={files_expediente.documento8}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-lg-2">9. FORMULARIO REGISTRAL</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento9.length !== 0 ?
                                                    <UploadFile name={'documento9'} key="documento9"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento9,
                                                                    originalName: files_expediente.documento9
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento9'} key="upload_documento_rspta"
                                                                file={files_expediente.documento9}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">10. CHEQUE ENTREGADO</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento10.length !== 0 ?
                                                    <UploadFile name={'documento10'} key="documento10"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento10,
                                                                    originalName: files_expediente.documento10
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento10'} key="upload_documento_rspta"
                                                                file={files_expediente.documento10}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">11. COMPROBANTE DE PAGO</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento11.length !== 0 ?
                                                    <UploadFile name={'documento11'} key="documento11"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento11,
                                                                    originalName: files_expediente.documento11
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento11'} key="upload_documento_rspta"
                                                                file={files_expediente.documento11}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">12. ACTA DE ENTREGA DEL
                                                CHEQUE</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento12.length !== 0 ?
                                                    <UploadFile name={'documento12'} key="documento12"

                                                                file={{
                                                                    urlDocumento: files_expediente.documento12,
                                                                    originalName: files_expediente.documento12
                                                                }}


                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento12'} key="upload_documento_rspta"
                                                                file={files_expediente.documento12}
                                                                setFile={savefile}></UploadFile>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-lg-2">13. ACTA DE ENTREGA DEL
                                                INMUEBLE</label>
                                            <div className="col-lg-6">
                                                {files_expediente.documento13.length !== 0 ?
                                                    <UploadFile name={'documento13'} key="documento13"
                                                                file={{
                                                                    urlDocumento: files_expediente.documento13,
                                                                    originalName: files_expediente.documento13
                                                                }}
                                                                setFile={savefile}></UploadFile>
                                                    :
                                                    <UploadFile name={'documento13'} key="upload_documento_rspta"
                                                                file={files_expediente.documento13}
                                                                setFile={savefile}>
                                                    </UploadFile>
                                                }
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                                <div className="pull-left">
                                    <button type="button" onClick={guardarFilesExp}
                                            className="btn btn-danger btn-sm btn-control"> Guardar
                                    </button>


                                </div>
                                <div className="pull-right">

                                    <button type="submit" className="btn btn-default btn-sm btn-control">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> Anterior
                                    </button>
                                    <button type="submit"
                                            className="btn  btn-default btn-sm btn-control">Siguiente <i
                                        className="fa fa-angle-right" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div className="pull-right">
                                    <div className="progress progress-striped active m-top-sm m-bottom-none">
                                        <div className="progress-bar progress-bar-success" id="wizardProgress">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Procesos;