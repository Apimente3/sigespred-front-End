import React from 'react'

export const CardBlog = (props) => {
    return(
        <div className="cardBlog" style={{ width: props.width ? props.width: '100%' }} {...props}>
            {props.children}
        </div>
       )
}
