import React from 'react'
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { Form, FormFooter, FormGroup, Input, Options, Row12, Row6, RowForm, Select, TextArea } from '../../components/forms';
import SingleUpload from '../../components/uploader/SingleUpload';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import { useForm } from '../../hooks/useForm';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {initAxiosInterceptors} from '../../config/axios';

const rutaFolder = 'folder/MTC'

const {$} = window;
const Axios = initAxiosInterceptors();


async function addBlog(blog) {
    const {data} = await Axios.post(`/blog`,blog);
    return data;
}

export const BlogAdd = (history) => {

    const [blog, setBlog,handleInputChange, reset ] = useForm({}, []);

    const registrar = async e => {
        e.preventDefault();
        $('#btnguardar').button('loading');

        try {

            await addBlog(blog)
            toastr.success('Registro Correcto', 'Se registro correctamente.', {position: 'top-right'});
            //history.push('/blog');
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
                                <TextArea 
                                    required={true} 
                                    value={blog.contenido} 
                                    onChange={handleInputChange}
                                    name={"contenido"} 
                                    placeholder={"Ingrese texto del blog"}
                                    type={"text"}>
                                </TextArea>
                            </FormGroup>
                            <FormGroup label={"Categoria"}>
                                 <Select 
                                    required={true} 
                                    value={blog.categoria}
                                    onChange={handleInputChange}
                                    name={"categoria"}>
                                    <Options 
                                        options={[
                                                    {id: 1, value: "CATEGORIA 1"}, 
                                                    {id: 2, value: "CATEGORIA2"}]} 
                                        index={"id"}
                                        valor={"value"}>
                                    </Options> 
                            </Select>
                            </FormGroup>
                            <FormGroup label={"Adjuntar Archivo"} 
                                   ayuda={"Archivo del documento de preferencia en PDF."}>
                                  <SingleUpload
                                    key="upload_portada_imagen"
                                    accept={'.*'}
                                    folderSave={rutaFolder}
                                    form={blog}
                                    setForm={setBlog}
                                    nameUpload={"archivodigital"}
                                        >
                                </SingleUpload> 
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
