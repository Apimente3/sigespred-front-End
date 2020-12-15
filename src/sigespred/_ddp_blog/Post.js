import React from 'react'
import { BlogPost } from './BlogPost'
import { Sidebar } from './Sidebar'



export const Post = ({titulo, contenido, id}) => {
    return (
        <>
        <section className="containerBlog">
            {/* <BlogPost/>
            <Sidebar/> */}
            <h3>{titulo}</h3>
            <p className="post-content">{contenido}</p>
            
        </section>
    </>
    )
}
