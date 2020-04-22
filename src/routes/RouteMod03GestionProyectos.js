import listProyectos from "../sigespred/m003_gestion_proyectos/Proyectos";
import ProyectoAdd from "../sigespred/m003_gestion_proyectos/ProyectoAdd";
import ProyectoEdit from "../sigespred/m003_gestion_proyectos/ProyectoEdit";
import ProyectoDel from "../sigespred/m003_gestion_proyectos/ProyectoDel";


const RouteMod03GestionProyectos =
    [
        {path: "/proyecto-add", component: ProyectoAdd},
        {path: "/proyecto-edit/:codigo", component: ProyectoEdit},
        {path: "/proyecto-del", component: ProyectoDel},
        {path: "/list-proyectos", component: listProyectos},
    ]


export default RouteMod03GestionProyectos;