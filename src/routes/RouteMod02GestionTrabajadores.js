import Trabajadores from "../sigespred/m002_gestion_trabajadores/m002_01_trabajadores/Trabajadores";
import TrabajadorAdd from "../sigespred/m002_gestion_trabajadores/m002_01_trabajadores/TrabajadorAdd";
import TrabajadorDel from "../sigespred/m002_gestion_trabajadores/m002_01_trabajadores/TrabajadorDel";
import TrabajadorEdit from "../sigespred/m002_gestion_trabajadores/m002_01_trabajadores/TrabajadorEdit";
import Brigadas from "../sigespred/m002_gestion_trabajadores/m002_02_equipos/Brigadas";
import BrigadaAdd from "../sigespred/m002_gestion_trabajadores/m002_02_equipos/BrigadaAdd";

const RouteMod02GestionTrabajadores = [
    {path: "/list-trabajadores", component: Trabajadores},
    {path: "/trabajador-add", component: TrabajadorAdd},
    {path: "/trabajador-del/:id", component: TrabajadorDel},
    {path: "/trabajador-edit/:id", component: TrabajadorEdit},
    {path: "/brigada-list", component: Brigadas},
    {path: "/equipo-gestion/:idequipo", component: BrigadaAdd}
]

export default RouteMod02GestionTrabajadores;