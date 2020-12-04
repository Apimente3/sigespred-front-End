import OrdenServicio from "../sigespred/_ddp_ordenservicio/OrdenServicioList";
import { OrdenServicioAdd } from "../sigespred/_ddp_ordenservicio/OrdenServicioAdd";
import { OrdenServicioEdit } from "../sigespred/_ddp_ordenservicio/OrdenServicioEdit";


const RouterModOrdenServicio = [
    {path: "/", component:OrdenServicio},
    {path: "/orden-list", component: OrdenServicio},
    {path: "/orden-add", component: OrdenServicioAdd},
    {path: "/orden-edit/:id", component: OrdenServicioEdit},
]

export default RouterModOrdenServicio;