import React from 'react';
import {Link} from "react-router-dom";
import Form from "./Form";

const FormFooter = ({children}) => {
    return (
        <>
            <div className="panel-footer text-right">

                <div className="form-group ">
                    <div className="col-lg-offset-2 col-lg-10">

                        {children}



                    </div>

                </div>

            </div>
        </>
    );
};

export default FormFooter;