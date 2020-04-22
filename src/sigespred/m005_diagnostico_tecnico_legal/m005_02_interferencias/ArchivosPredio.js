import React, {useState} from 'react';
import SidebarPredios from "./SidebarPredios";
import Header from "../../header/Header";
import UploadFileMultiple from "../../helpers/uploaders/UploadMultiple";

const ArchivosPresio = ({match}) => {
    const {codigo} = match.params;
    const [filesaditional, setFilesaditional] = useState([]);

    const setFiles=(newListFiles)=>{
        setFilesaditional([...filesaditional,newListFiles])
    }

    const removeFiles=(id)=>{
        setFilesaditional(
            filesaditional.filter(file => file.id !== id)
        )
    }
    return (
        <div>
            <Header></Header>
            <SidebarPredios codigopredio={codigo}></SidebarPredios>
            <form>
                <div className="container mtop-20">

                    <div className="panel panel-default form-horizontal no-margin form-border">

                        <div className="panel-body">
                            <fieldset className={'fielsettext'}>
                                <legend align="center fielsettext">Archivos del Predios</legend>
                            </fieldset>

                            <div>


                                <div className="form-group">

                                    <label className="col-lg-2 control-label"><span
                                        className="obligatorio">* </span> </label>
                                    <div className="col-lg-10">
                                        <UploadFileMultiple listFiles={[]} setListFiles={setFiles} removeFiles={removeFiles}/>
                                    </div>
                                </div>
                               


                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ArchivosPresio;