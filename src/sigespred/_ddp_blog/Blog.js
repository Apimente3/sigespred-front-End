import React from 'react'
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";

export const Blog = () => {
    return (
        <>
            <WraperLarge titleForm={"Bienvenido al blog de la DDP"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
                <div className="row">

                </div>

            </WraperLarge>
        </>
    )
}
