import GestionPredial from "../sigespred/gestion_predial/GestionPredial";
import GestionPredials from "../sigespred/_ddp_gestion_predial/GestionPredials";
import GestionPredialAdd from "../sigespred/_ddp_gestion_predial/GestionPredialAdd";
import BaseGrafica from "../sigespred/base_grafica/BaseGrafica";
import BaseGrafica2 from "../sigespred/base_grafica/BaseGrafica2";
import Configuraciones from "../sigespred/base_grafica/Configuraciones";
import Brigadas from "../sigespred/base_grafica/Brigadas";

const RouteGestionPredial = [
    {path: "/gestionpredial", component: GestionPredials},
    {path: "/gestionpredial-add", component: GestionPredialAdd},
    {path: "/gestion-predial/:codproyecto", component: GestionPredial},
    {path: "/base-grafica-ubicacion/:codproyecto", component: BaseGrafica},
    {path: "/base-grafica-adjuntos/:codproyecto", component: BaseGrafica2},
    {path: "/configuraciones-proyecto/:codproyecto", component: Configuraciones},
    {path: "/brigadas-proyecto/:codproyecto", component: Brigadas},
    {path: "/gestionpredial", component: GestionPredials},

]

export default RouteGestionPredial;

