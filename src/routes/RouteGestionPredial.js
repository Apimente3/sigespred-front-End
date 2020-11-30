import GestionPredial from "../sigespred/gestion_predial/GestionPredial";
import GestionPredials from "../sigespred/_ddp_gestion_predial/GestionPredials";
import GestionPredialAdd from "../sigespred/_ddp_gestion_predial/GestionPredialAdd";
import GestionPredialEdit from "../sigespred/_ddp_gestion_predial/GestionPredialEdit";
import GestionPredialPoligono from "../sigespred/_ddp_gestion_predial/GestionPredialPoligono";
import GestionPredialPoligonoList from "../sigespred/_ddp_gestion_predial/GestionPredialPoligonoList";
import BaseGrafica from "../sigespred/base_grafica/BaseGrafica";
import BaseGrafica2 from "../sigespred/base_grafica/BaseGrafica2";
import Configuraciones from "../sigespred/base_grafica/Configuraciones";
import Brigadas from "../sigespred/base_grafica/Brigadas";
import Proyectos from "../sigespred/m003_gestion_proyectos/Proyectos";

const RouteGestionPredial = [
    {path: "/gestionpredial", component: GestionPredials},
    {path: "/gestionpredial-add", component: GestionPredialAdd},
    {path: "/gestionpredial-edit/:id", component: GestionPredialEdit},
    {path: "/gestion-predial/:codproyecto", component: GestionPredial},
    {path: "/base-grafica-ubicacion/:codproyecto", component: BaseGrafica},
    {path: "/base-grafica-adjuntos/:codproyecto", component: BaseGrafica2},
    {path: "/configuraciones-proyecto/:codproyecto", component: Configuraciones},
    {path: "/brigadas-proyecto/:codproyecto", component: Brigadas},
    {path: "/gestionpredial-valida/:id/:ti/:idpoligono?", component: GestionPredialPoligono},
    {path: "/gestionpredial-validalist/:id", component: GestionPredialPoligonoList},
    {path: "/gestionpredial-list", component: Proyectos},

]

export default RouteGestionPredial;

