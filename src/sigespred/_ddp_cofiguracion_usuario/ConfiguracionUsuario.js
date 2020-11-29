import React, {Component} from "react";
import {Switch, Route, Link, useRouteMatch} from "react-router-dom";
import Wraper from "../m000_common/formContent/WraperLarge";
import CambiarContrasenia from "../m002_gestion_trabajadores/m002_01_trabajadores/CambiarContrasenia"
import TrabajadorAdd from "../m002_gestion_trabajadores/m002_01_trabajadores/TrabajadorAdd"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {toastr} from "react-redux-toastr";
import { MisActividades } from "../m002_gestion_trabajadores/m002_01_trabajadores/MisActividades";
import  Perfil  from "../_ddp_perfil/Perfil";


class ConfiguracionUsuario extends Component {
    render() {
        return (
            <>
                <Wraper titleForm={"Actualizacion de Gestión Predial"} listbreadcrumb={[]} header={false}>
                    <Tabs defaultIndex={0}>
                        <TabList>
                            <Tab>
                                Cambiar tu contraseña
                            </Tab>


                            <Tab>
                                Mis Actividades Diarias
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <CambiarContrasenia></CambiarContrasenia>
                        </TabPanel>

                        <TabPanel>
                            <MisActividades></MisActividades>

                        </TabPanel>

                    </Tabs>
                </Wraper>
            </>
        );

    }
};


export default ConfiguracionUsuario;