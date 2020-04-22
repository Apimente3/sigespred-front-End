import React, {Component} from 'react';
import Header from "../../header/Header";

import Footer from "../../footer/Footer";
import {Link} from 'react-router-dom';
import './styles.css'

import 'toastr/build/toastr.min.css'
import './styles.css'
import toastr from "toastr";
import FooterProcess from "../FooterProcess";
const {jQuery} = window;




class Index extends Component {

   state={}

   

    iniciarProcesoExpropiacion = async (e) => {
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
            "showDuration": "3300",
            "hideDuration": "1000",
            "timeOut": "15000",
            "extendedTimeOut": "11000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

         toastr["info"](`

							<div class="panel-body">
							
								<p>Acaba de Iniciar el Proceso de Expropiacion del Predio, a partir de ahora tendra que empezar al cumplir todos los procesos 
								Haga <b>CLICK AQUI</b>
								</p
							</div>
					
         `)
        await this.espera(this.props.history);
       // this.props.
    }
    
    
    espera= async (history)=>{
      await setTimeout(async ()=>{
          history.push('/proce-1/asadsd');
       },5000)
    }
    
    

    render() {
      
        return (
            <div>

                <Header></Header>
             
                    <div className="container mtop-20">
                        <h4 className=" ">
                            
                        </h4>

                        <div className="panel panel-default form-horizontal no-margin form-border">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h5><i className="fa fa-certificate" aria-hidden="true"></i>  PROC-00 INICIO DE PROCESO DE EXPROPIACION</h5> 
                                </div>
                          
                            </div>
                         
                          
                        </div>
                        <div className="panel-body">
                            <form action="" onSubmit={this.iniciarProcesoExpropiacion}>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"><span className="obligatorio">* </span>Asignar un codigo de Expediente al Predio</label>
                                <div className="col-lg-6">
                                    <input required className="form-control input-sm" type="text"
                                           placeholder="Codigo Expediente"></input>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="panel-body">
                                <div className="form-group ">
                                    <div className="col-lg-offset-2 col-lg-10">
                                        <button  id="btnguardar" type="submit" className="btn btn-info btn-sm mg-10"
                                                 data-loading-text="<i class='fa fa-spinner fa-spin '></i> Iniciando Proceso de Expropiacion"
                                        >Iniciar Proceso de Expropiacion
                                        </button>
                                        <Link to={`/predios-list`} className="btn btn-default btn-sm btn-control">Cancelar</Link>
                                   </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

                <FooterProcess/>
            </div>
        );
    }
}

export default Index;