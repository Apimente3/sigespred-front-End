import React, { useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr';
import { Form, FormFooter, FormGroup, Input, Options, Row12, RowForm, Select, TextArea } from '../../components/forms';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import { useForm } from '../../hooks/useForm';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {initAxiosInterceptors} from '../../config/axios';
import { useAsync } from 'react-async-hook';
import * as helperGets from "../../components/helpers/LoadMaestros";
import SingleUpload from '../../components/uploader/SingleUpload';
import { Link } from 'react-router-dom';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { FilesImagenBlog } from '../../config/parameters';

const {$} = window;
const Axios = initAxiosInterceptors();


async function obtenerBlog(id) {
    const { data } = await Axios.get(`/blog/${id}`);
    return data;
  }

async function updateBlog(blog) {
    const { data } = await Axios.put(
      `/blog/${blog.id}`,
      blog
    );
    return data;
  }

export const BlogEdit = ({match, history}) => {
    const { id } = match.params;
    const [blog, setBlog, handleInputChange, reset] = useForm({},['titulo','descripcion']);
    const resListaCategorias = useAsync(helperGets.helperGetListCategorias,[])
    const [content, setContent] = useState("");

    useEffect(()=>{
        const init = async () => {
            let blog = await obtenerBlog(id);
            setBlog(blog);
        }
        init();
    }, []);



    const actualizar = async (e) => {
        e.preventDefault();

        try {
            
            await updateBlog(blog);
            toastr.success(
                "Actualización del Blog",
                "El blog fue actualizado correctamente.",
                { position: "top-right" }
              );

            history.push("/blog");
        } catch (error) {
            toastr.error("Registro Incorrecto", JSON.stringify(e), {
                position: "top-right",
              }); 
        }
    }

    return (
        <>
        <WraperLarge titleForm={"Formulario de creación de Blog"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
            <Form onSubmit={actualizar} className={"form-horizontal"}>
                <RowForm>
                    <Row12 title={"CREACION DE LA ENTRADA DEL BLOG"}>
                        <FormGroup label={"Titulo de la entrada "} require={true}>
                            <Input 
                                required={true} 
                                value={blog.titulo || ""} 
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
                                        
                                        // [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                        // ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                        // ['fontColor', 'hiliteColor', 'textStyle'],
                                        // ['removeFormat'],
                                        // ['outdent', 'indent'],
                                        // ['align', 'horizontalRule', 'list', 'lineHeight'],
                                        // ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
                                        // ['-right', ':r-More Rich-default.more_plus', 'table', 'math', 'imageGallery'],
                                        // ['-right', 'image', 'video', 'audio', 'link'],
                                    ]
                                
                                }}
                                />
                                <div>{content}</div>

                        </FormGroup>
                        <FormGroup label={"Categoria"}>
                            <Select 
                                required={true} 
                                value={blog.categoria || ""}
                                onChange={(e)  => {
                                    handleInputChange(e);
                                }}
                                name={"categoria"}>
                                    
                                     {resListaCategorias.result && 
                                        <Options options={resListaCategorias.result} index={"id"} valor={"descripcion"}></Options>
                                     }
                            </Select>
                        </FormGroup>
                        <FormGroup label={"Adjuntar Archivo"} 
                                   ayuda={"Archivo del documento de preferencia en PDF."}>
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
                    <Link
                    to={`/blog`}
                    className="btn btn-default btn-sm btn-control"
                    >
                    Cancelar
                    </Link>
                    <button
                    id="btnguardar"
                    type="submit"
                    className="btn btn-danger btn-sm btn-control"
                    >
                    Guardar
                    </button>
                </FormFooter>
            </Form>
        </WraperLarge>

        </>
    )
}
