import React from 'react';
import Header from "../headers/Header";
import SidebarAdm from "../siderbars/SidebarAdm";
import {serverFile} from "../../../config/axios";
import UploadMemo from "../../../components/helpers/uploaders/UploadMemo";
import {FilesUsuario} from "../../../config/parameters";
import {Link} from "react-router-dom";
import FooterProcess from "../footers/FooterProcess";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const Wraper = ({children, titleForm, listbreadcrumb}) => {
    return (
        <div>
            <Header/>
            <SidebarAdm/>
            <div className="container mtop-20">
                <Breadcrumb listbreadcrumb={listbreadcrumb}></Breadcrumb>
                <form>
                    <fieldset className={'fielsettext'}>
                        <legend align="mtop-25 center fielsettext ">

                        </legend>
                    </fieldset>
                </form>

                <div className="panel panel-default form-horizontal no-margin form-border">
                    <div className="panel-heading" >{titleForm}</div>
                    <div className="panel-body">
                        {children}
                    </div>
                </div>


            </div>
            <div className="row margin-button-form "></div>
            <FooterProcess/>
        </div>
    );
};

export default Wraper;