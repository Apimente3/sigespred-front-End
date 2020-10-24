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
        <>
            <Header/>
            <SidebarAdm/>
            <div id="main-container2">
                <Breadcrumb listbreadcrumb={listbreadcrumb}></Breadcrumb>
                <div className="padding-md">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default  form-horizontal">
                                <div className="panel-heading" >{titleForm}</div>
                                <div className="panel-body">
                                    {children}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <FooterProcess/>
        </>
    );
};

export default Wraper;