import React from 'react';
import Header from "../../header/Header";
import SiderBarMemoriaDescriptiva from "./SiderBarMemoriaDescriptiva";

const DescripcionPredio = ({history, match}) => {
    const {codpred} = match.params;
    return (
        <>
            <Header></Header>
            <SiderBarMemoriaDescriptiva predio={codpred}/>
            <div className="container mtop-20">
            <form>
                <fieldset className={'fielsettext'}>
                    <legend align="center fielsettext">4. DESCRIPCIÓN DEL PREDIO</legend>
                </fieldset>
            </form>
            <div className="panel panel-default">

                <div className="panel panel-default">
                    <div className="panel-heading">

                        4.1 AREA DEL PREDIO

                    </div>
                    <div className="panel-body">

                        <table
                            className="table table-bordered table-condensed table-hover table-striped">
                            <thead>
                            <tr>
                                <th>DESCRIPCION</th>
                                <th>UNIDAD</th>
                                <th>AREA</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-12">
                                        M2
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="panel panel-default">
                    <div className="panel-heading">

                        4.2 COLINDANCIAS Y LINDEROS DEL PREDIO

                    </div>
                    <div className="panel-body">

                        <table
                            className="table table-bordered table-condensed table-hover table-striped">
                            <thead>
                            <tr>
                                <th>LIMITE</th>
                                <th>COLINDANCIA</th>
                                <th>LONGITUD (m)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    NORTE
                                </td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    SUR
                                </td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    ESTE
                                </td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    OESTE
                                </td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="col-lg-6">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="panel panel-default">
                    <div className="panel-heading">

                        4.3. CUADRO DE COORDENADAS DEL PREDIO

                    </div>
                    <div className="panel-body">

                        <label className="col-lg-2 control-label"><span
                            className="obligatorio">* </span> Archivo Shapefile</label>
                        <div className="col-lg-6">
                            <input required className="input-sm" type="file"></input>
                        </div>
                        <br></br>
                        <hr></hr>
                        <table
                            className="table table-bordered table-condensed table-hover table-striped">
                            <thead>
                            <tr>
                                <th>VERTICE</th>
                                <th>LADO</th>
                                <th>DISTANCIA</th>
                                <th>ESTE (X)</th>
                                <th>NORTE (Y)</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            </div>


        </>
    );
};

export default DescripcionPredio;