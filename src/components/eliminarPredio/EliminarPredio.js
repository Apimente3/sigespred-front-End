import React, {Component} from 'react';
import Header from "../header/Header";

import Footer from "../footer/Footer";
import {Link} from 'react-router-dom';
import './styles.css'
import toastr from "toastr";
import FooterProcess from "../gestionPredios/FooterProcess";
const {jQuery} = window;


class EliminarPredio extends Component {

    state = {
        vial: true,
        aero: false,
        ferro: false,
        puerto: false
    }

    eliminarPredio = (e) => {
        e.preventDefault();
        jQuery('#btnguardar').button('loading');

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-center-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "50000",
            "hideDuration": "50000",
            "timeOut": "50000",
            "extendedTimeOut": "50000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        toastr["info"](`

							<div class="panel-body">
							
								<p>Se elimino este predio correctamente, ya no sera visible para los demas usuarios vinculados al PREDIO ...</p>
							</div>
					
         `)

        setTimeout(function () {
             this.props.history.push('/predios-list');
         
        },6000)




    }


    render() {
        const {vial, aero, ferro, puerto} = this.state;
        return (
            <div>

                <form action="">

                    <Header></Header>
                    <div className="container mtop-20">
                        <h4 className="headline ">
                            Eliminacion del Predio
                            <span className="line"></span>
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                            <div className="panel-heading">
                                <h5><i className="fa fa-trash-o" aria-hidden="true"></i> Eliminacion del Predio</h5>
                            </div>
                            <div className="panel-body">
                                <form action="" onSubmit={this.eliminarPredio}>

                                    <div className="form-group">
                                        <label className="col-lg-2 control-label"><span
                                            className="obligatorio">* </span> Nº
                                            Codigo del Predio</label>
                                        <div className="col-lg-6">
                                            <input required className="form-control input-sm" type="text"
                                                   placeholder="Confirme el codigo del PREDIO a ELIMINAR"></input>
                                        </div>
                                    </div>


                                    <div className="form-group ">
                                        <label className="col-lg-2 control-label">Motivo de Eliminacion </label>
                                        <div className="col-lg-6">
                                <textarea required className="form-control input-sm"
                                          placeholder="Ingrese el Motivo de la Eliminacion">
                                  
                                </textarea>
                                        </div>

                                    </div>
                                    <hr></hr>
                                    <div className="panel-body">
                                        <div className="form-group ">
                                            <div className="col-lg-offset-2 col-lg-10">
                                                <button id="btnguardar" type="submit"
                                                        className="btn btn-danger btn-sm btn-control">Eliminar
                                                </button>
                                                <Link to={`/predios-list`}
                                                      className="btn btn-default btn-sm btn-control">Cancelar</Link>

                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row margin-button-form "></div>
                  
                </form>
                <FooterProcess/>
            </div>
        );
    }
}

export default EliminarPredio;