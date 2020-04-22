import React from 'react';

const BoxNoEncontrado = ({mensaje1 = 'No hay resultados que coincidan con su búsqueda.', mensaje2 = 'Intente ajustar sus palabras clave o filtros de búsqueda'}) => {
    return (
        <>
          
            <div className="padding-md">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 text-center">
                        <div className="h5 mtop-100" style={{marginTop: "100px"}}></div>
                        <img className='fotonotfound' src='/img/nofound.svg'></img>

                        <h4 className="no-margin">{mensaje1}</h4>
                        <span> {mensaje2}</span>

                        <div className="input-group m-bottom-md">


                        </div>


                    </div>

                </div>

            </div>
         
        </>
    );
};

export default BoxNoEncontrado;

