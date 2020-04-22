import React from 'react';
import Header from "../../header/Header";
import SiderBarMemoriaDescriptiva from "./SiderBarMemoriaDescriptiva";

const DescripcionEntorno = ({history, match}) => {
    const {codpred} = match.params;
    return (
        <>

            <Header></Header>
            <SiderBarMemoriaDescriptiva predio={codpred}/>
            <div  className="container mtop-20">
                <form>
                    <fieldset className={'fielsettext'}>
                        <legend align="center fielsettext">5. DESCRIPCIÓN DEL ENTORNO</legend>
                    </fieldset>
                </form>
                <div>


                    <div className="panel panel-default">
                        <div className="panel-heading">

                            PREDIO RÚSTICO/URBANO


                        </div>
                        <div className="panel-body">

                            <table
                                className="table table-bordered table-condensed table-hover table-striped">
                                <thead>

                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        USO ACTUAL
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        TOPOGRAFÍA
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        PENDIENTE
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        ACCESIBILIDAD
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>

                                <tr>
                                    <td>
                                        TIPO DE CULTIVOS PREDOMINANTES
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        TIPO DE RIEGO
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        CLIMA
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td>
                                        INFRAESTRUCTURA DE RIEGO
                                    </td>
                                    <td>
                                        <div className="col-lg-12">
                                            <input required className="form-control input-sm"
                                                   type="text"></input>
                                        </div>
                                    </td>


                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </div>

        </>
    );
};

export default DescripcionEntorno;