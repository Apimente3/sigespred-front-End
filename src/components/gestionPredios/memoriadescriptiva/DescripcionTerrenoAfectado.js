import React from 'react';
import Header from "../../header/Header";
import SiderBarMemoriaDescriptiva from "./SiderBarMemoriaDescriptiva";

const 
DescripcionTerrenoAfectado = ({history, match}) => {
    const {codpred} = match.params;
    return (
        <>
            <Header></Header>
            <SiderBarMemoriaDescriptiva predio={codpred}/>
            <div className="container mtop-20">
            <form>
                <fieldset className={'fielsettext'}>
                    <legend align="center fielsettext"> 6. DESCRIPCIÓN DEL TERRENO AFECTADO </legend>
                </fieldset>
            </form>
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">

                        6.1 ÁREA DEL TERRENO AFECTADO


                    </div>
                    <div className="panel-body">
<center>
                        <table   className="table table-bordered table-condensed table-hover table-striped">
                            <tbody>
                            <tr>
                                <td colSpan="3" width="253">DESCRIPCI&Oacute;N</td>
                                <td width="102">UND</td>
                                <td width="115">&Aacute;REA&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td colSpan="3">&Aacute;REA TOTAL DEL PREDIO&nbsp;</td>
                                <td width="102">m2</td>
                                <td>   <div className="col-lg-12">
                                    <input required className="form-control input-sm"
                                           type="text"></input>
                                </div></td>
                            </tr>
                            <tr>
                                <td rowSpan="3" width="84">&Aacute;reas afectadas</td>
                                <td colSpan="2">Afectaci&oacute;n Directa</td>
                                <td width="102">m2</td>
                                <td>   <div className="col-lg-12">
                                    <input required className="form-control input-sm"
                                           type="text"></input>
                                </div></td>
                            </tr>
                            <tr>
                                <td colSpan="2">Afectaci&oacute;n Indirecta</td>
                                <td width="102">m2</td>
                                <td>   <div className="col-lg-12">
                                    <input required className="form-control input-sm"
                                           type="text"></input>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">AFECTADA TOTAL</td>
                                <td width="102">m2</td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">&Aacute;REA REMANENTE</td>
                                <td width="102">m2</td>
                                <td>
                                    <div className="col-lg-12">
                                        <input required className="form-control input-sm"
                                               type="text"></input>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
</center>
                    </div>
                </div>
              
                <div className="panel panel-default">
                    <div className="panel-heading">

                        6.2. COLINDANCIAS Y LINDEROS DEL ÁREA AFECTADA


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

                        6.3. CUADRO DE COORDENADAS UTM DEL ÁREA AFECTADA

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

export default 
DescripcionTerrenoAfectado;