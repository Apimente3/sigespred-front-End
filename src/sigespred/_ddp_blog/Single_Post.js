import React, { useEffect } from 'react'
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {initAxiosInterceptors, serverFile} from '../../config/axios';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
const {$} = window;
const Axios = initAxiosInterceptors();

const noImagen = "img/no-imagen.jpg"

async function getBlog(id) {
    const { data } = await Axios.get(`/blog/${id}`);
    console.log(data)
    return data;
  }

export const Single_Post = ({match, history}) => {
    const { id } = match.params;
    const [blog, setBlog, handleInputChange, reset] = useForm({},[]);

    useEffect(()=>{
        const init = async () => {
            let blog = await getBlog(id);
            setBlog(blog);
        }
        init();
    }, []);
    return (
        <>
        {/* <WraperLarge titleForm={"Bienvenido al blog de la DDP " + id} listbreadcrumb={LISTADO_BLOG_BREADCRUM}> */}
        <WraperLarge titleForm={"Bienvenido al blog de la DDP"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
            <div className="padding-md">
                <div className="row">
                    <div className="col-md-12" >
                        <h3 className="headline m-top-md">
                            Bienvenido al nuestro Blog
                            <span className="line"></span>
                        </h3>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="panel blog-container">
                                <div class="panel-body">
                                        <h4>{blog.titulo}</h4>
										<small className="text-muted">By <a href="#"><strong> John Doe</strong></a> |  Post on Aug 15, 2013  | 3 comments</small>
										<div className="seperator"></div>
										
										<div className="image-wrapper">
											<a className="image-wrapper image-zoom cboxElement photoBlog" href={blog.imagen ? serverFile+blog.imagen.path : serverFile +  noImagen }>
												<img src={blog.imagen ? serverFile+blog.imagen.path : serverFile +  noImagen } alt="Photo of Blog"/>
												<div className="image-overlay"></div>	
											</a>
										</div>
																		
										<p class="m-top-sm m-bottom-sm">
                                            <div dangerouslySetInnerHTML={{__html: blog.contenido, sanitize: true}}/>
										</p>
										<div class="m-top-sm">
                                            <Link to={`/display-post/`} className="btn btn-sm btn-success">Regresar</Link>
											{/* <a href="#" class="btn btn-sm btn-success">Previous</a> */}
											{/* <a href="#" class="btn btn-sm btn-success pull-right">Next Post</a> */}
										</div> 
									</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </WraperLarge>
        </>
    )
}
