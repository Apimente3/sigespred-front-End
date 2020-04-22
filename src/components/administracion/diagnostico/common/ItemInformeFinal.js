import React from 'react';

const ItemInformeFinal = () => {
    return (
        <> <div className="form-group ">


            <div className="col-lg-4">
                <a onClick={showModalIF} className="btn btn-default quick-btn"><i
                    className="fa fa-file-text-o"></i><span>Informe Final</span></a>

            </div>


        </div>

            <div className="col-lg-8">
                <a href="#" onClick={showModalCE} type="file"
                   className="btn btn-success btn-sm btn-actividades">
                    + CONSULTA A ENTIDADES
                </a>
                &nbsp;&nbsp;
                <a href="#" onClick={showModalVC} type="file"
                   className="btn btn-info btn-sm btn-actividades">
                    + INSPECCION DE CAMPO
                </a>


            </div>
        </>
    );
};

export default ItemInformeFinal;