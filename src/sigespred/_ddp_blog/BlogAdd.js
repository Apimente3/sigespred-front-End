import React, { useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { Form, FormFooter, FormGroup, Input, Options, Row12, Row6, RowForm, Select, TextArea } from '../../components/forms';
import SingleUpload from '../../components/uploader/SingleUpload';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import { useForm } from '../../hooks/useForm';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {initAxiosInterceptors} from '../../config/axios';
import { useAsync } from 'react-async-hook';
import * as helperGets from "../../components/helpers/LoadMaestros";
import {FilesImagenBlog} from "../../config/parameters";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
//import ComboOptions from '../../components/helpers/ComboOptions';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const rutaFolder = 'folder/MTC'

const {$} = window;
const Axios = initAxiosInterceptors();



async function addBlog(blog) {
    const {data} = await Axios.post(`/blog`,blog);
    return data;
}




export const BlogAdd = ({history}) => {

    const [blog, setBlog,handleInputChange, reset ] = useForm({}, []);
    const resListaCategorias = useAsync(helperGets.helperGetListCategorias,[])
    const [listaCategoria, setListaCategoria] = useState("");
    const [content, setContent] = useState("");





    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');
        blog.contenido = content;
        try {

            await addBlog(blog)
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'});
            history.push('/blog');
        }
        catch (e){
            toastr.error('Registro Incorrecto', JSON.stringify(e), {position: 'top-right'})
        }
        $('#btnguardar').button('reset');
    }

    return (
        <>
            <WraperLarge titleForm={"Formulario de creación de Blog"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
                <Form onSubmit={registrar}>
                    <RowForm>
                        <Row12 title={"CREACION DE LA ENTRADA DEL BLOG"}>
                            <FormGroup label={"Titulo de la entrada "} require={true}>
                                <Input 
                                    required={true} 
                                    value={blog.titulo} 
                                    onChange={handleInputChange}
                                    name={"titulo"} 
                                    placeholder={"Ingrese titulo de la entrada"}
                                    type={"text"}>
                                </Input>
                            </FormGroup>
                            <FormGroup label={"Texto de la publicacion"}>
                            <SunEditor  
                                lang="es"
                                width="100%"
                                height="500px"
                                placeholder="Porfavor ingrese el contenido..."
                                showToolbar={true}
                                onChange={setContent}
                                setOptions={{
                                    buttonList: [
                                        // default
                                        ['undo', 'redo'],
                                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'list'],
                                        ['fontColor', 'hiliteColor', 'textStyle'],
                                        ['outdent', 'indent'],
                                        ['table', 'link', 'image'],
                                        ['align', 'horizontalRule',  'lineHeight'],
                                        ['fullScreen'],
                                        ['table' ],
                                    ]
                                
                                }}
                                />
                            </FormGroup>
                            <FormGroup label={"Categoria"}>
                                
                                <ReactMultiSelectCheckboxes
                                    options={
                                        { label: 'categoria 1', value: 1} ,
                                        { label: 'categoria 2', value: 2} ,
                                        { label: 'categoria 3', value: 3} 
                                    }
                                 
                                />
                                 {/* <Select 
                                    required={true} 
                                    value={blog.categoria}
                                    onChange={handleInputChange}
                                    name={"categoria"}>
                                        {resListaCategorias.result && 
                                    <Options options={resListaCategorias.result} index={"id"} valor={"descripcion"}></Options>
                                        }
                                    
                            </Select> */}
                            </FormGroup>
                            <FormGroup label={"Adjuntar Archivo"} 
                                   ayuda={"Archivo del documento de preferencia en JPG."}>
                                  <SingleUpload
                                    key="imagen"
                                    accept={'.*'}
                                    folderSave={FilesImagenBlog.FilesImagenes}
                                    form={blog}
                                    setForm={setBlog}
                                    nameUpload={"imagen"}
                                        >
                                </SingleUpload> 
                            </FormGroup>
                            <FormGroup label={"Estado"}>
                                <Select
                                    value={blog.estado  || "" }
                                    onChange={handleInputChange}
                                    name={"estado"}
                                >
                                    <Options options={[
                                        { id: "PENDIENTE", value: "PENDIENTE"},
                                        { id: "PUBLICADO", value: "PUBLICADO"}]}
                                        index={"id"}
                                        valor={"value"}>
                                        </Options>
                                </Select>
                        </FormGroup>     
                        </Row12>
                    </RowForm>
                    <FormFooter>
                        <Link to={`/blog`}
                            className="btn btn-default btn-sm btn-control">Cancelar</Link>
                        <button id="btnguardar" type="submit"
                                className="btn btn-danger btn-sm btn-control">Guardar
                        </button>
                    </FormFooter>
                </Form>
            
            </WraperLarge>
        </>
    )
}
