import React from 'react';
import File from "../../solicitudes/File";

const UploadFile = () => {
    return (
        <>
            <div className={'borderreumenes'}>
                <div className="form-group">

                    <div className="col-lg-8">

                        <ul className="list-group">


                            <File props={{filename:'PMD_2019.pdf',path:'PMD.pdf'}}/>

                            <File props={{filename:'Informe .pdf',path:'PMD.pdf'}}/>

                            <File props={{filename:'Memorando.pdf',path:'PMD.pdf'}}/>


                        </ul>


                    </div>



                </div>


                <div className="form-group">

                    <div className="col-lg-8">

                        <button type="button" className="btn btn-default btn-sm" id="remove-all"><i
                            className="fa fa-paperclip" aria-hidden="true"></i> Adjuntar</button>


                    </div>



                </div>
            </div>


        </>
    );
};

export default UploadFile;