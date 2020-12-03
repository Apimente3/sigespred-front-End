import React, {Component} from "react";
import Wraper from "../m000_common/formContent/WraperLarge";
import CambiarContrasenia from "../m002_gestion_trabajadores/m002_01_trabajadores/CambiarContrasenia";
import PerfilProfesional from "../m002_gestion_trabajadores/m002_01_trabajadores/PerfilProfesional";
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

                            <Tab>
                                Perfil Profesional
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <CambiarContrasenia></CambiarContrasenia>
                        </TabPanel>

                        <TabPanel>
                            <MisActividades></MisActividades>
                        </TabPanel>
                        <TabPanel>
                            <PerfilProfesional></PerfilProfesional>

                        </TabPanel>

                    </Tabs>
                </Wraper>
            </>
        );

    }
};


export default ConfiguracionUsuario;