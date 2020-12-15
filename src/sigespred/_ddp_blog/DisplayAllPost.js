import React, { useEffect, useState } from 'react'
import { initAxiosInterceptors, serverFile } from "../../config/axios";
import { useAsync } from 'react-async-hook';
import { Post } from './Post';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { Link } from 'react-router-dom';

const Axios = initAxiosInterceptors();
const { alasql } = window;
const { $ } = window;
const queryString = require("query-string");

async function buscarBlog(query) {
    const { data } = await Axios.get(`/blog2/buscarpost?` + query);
    return data;
  }

export const DisplayAllPost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [listaBlog, setListaBlog] = useState(null)

    useEffect(() => {
        async function initialLoad(){
            try {
              const {rows} = await buscarBlog('');
               setListaBlog(rows) 
                // debugger;
                
            } catch (error) {
                console.log(error);
            }
        }
        initialLoad();
      }, []);
      

    return (
        <>
        <WraperLarge titleForm={"Bienvenido al blog de la DDP"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
            <div className="padding-md">
                <div className="row">
                    <div className="col-md-11">	
                        <h3 className="headline m-top-md">
                            Bienvenido a nuestro Blog
                                <span className="line"></span>
                        </h3>
                        <div className="row">	
                            <div className="col-md-8">
                                { listaBlog && 
                                listaBlog.map(eachPost => 
                                    <div className="panel blog-container">
                                        <div className="panel-body">
                                            <a className="photoBlog image-wrapper image-zoom cboxElement" href={eachPost.imagen ? serverFile+eachPost.imagen.path : null }>
                                                <img  src={eachPost.imagen ? serverFile+eachPost.imagen.path : null } alt="Photo of Blog"/>
                                                <div className="image-overlay"></div>	
                                            </a>
                                            <h4>{eachPost.titulo || ""}</h4>

                                            <small className="text-muted">By <a href="#"><strong> John Doe</strong></a> |  Post on Aug 15, 2013  | 3 comments</small>
                                            <p className="m-top-sm m-bottom-sm">
                                                    <div dangerouslySetInnerHTML={{__html: eachPost.contenido, sanitize: true}}/>
                                            </p>
                                            <Link to={`/single-post/${eachPost.id}`} className="btn btn-sm btn-success"><i className="fa fa-angle-double-right"></i> Continuar leyendo</Link>
                                            {/* <Link to={`/single-post/${eachPost.id}`}><i className="fa fa-angle-double-right"></i> Continuar leyendo</Link> */}
                                            {/* <a href="/single-post/"><i class="fa fa-angle-double-right"></i> Continue reading</a> */}
                                            <span className="post-like text-muted tooltip-test" data-toggle="tooltip" data-original-title="I like this post!">
                                                {/* <i className="fa fa-heart"></i>  */}
                                                {/* <span class="like-count">8</span> */}
                                            </span>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                            <div className="col-md-4">
                                {/* COMPONENTE DE CATEGORIA */}
                                <h4 className="headline">CATEGORIA
                                    <span className="line"></span>
                                </h4>
                                <ul className="category">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-chevron-right">Categoria 01</i>
                                        </a>
                                    </li>
                                </ul>
                                    {/* COMPONENTE ABOUT - BLOG */}
                                    <h4 className="headline">
                                        ABOUT THE BLOG
                                    <span className="line"></span>
                                    </h4>
                                    <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros nibh, viverra a dui a, gravida varius velit. Nunc vel tempor nisi. Aenean id pellentesque mi, non placerat mi. Integer luctus accumsan tellus. Vivamus quis elit sit amet nibh lacinia suscipit eu quis purus. Vivamus tristique est non ipsum dapibus lacinia sed nec metus.
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WraperLarge>
        </>
    )
}

