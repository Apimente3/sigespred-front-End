import OrdenServicio from "../sigespred/_ddp_ordenservicio/OrdenServicio";
import { OrdenServicioAdd } from "../sigespred/_ddp_ordenservicio/OrdenServicioAdd";


const RouterModOrdenServicio = [
    {path: "/", component:OrdenServicio},
    {path: "/orden-list", component: OrdenServicio},
    {path: "/orden-add", component: OrdenServicioAdd},
]

export default RouterModOrdenServicio;