import Equipo from "../sigespred/_ddp_equipo/Equipo";
import EquipoAdd from "../sigespred/_ddp_equipo/EquipoAdd";
import EquipoDel from "../sigespred/_ddp_equipo/EquipoDel"
import EquipoEdit from "../sigespred/_ddp_equipo/EquipoEdit"

const RouteModEquipos = [
    {path: "/list-equipos2", component: Equipo},
    {path: "/equipo-add", component: EquipoAdd},
    {path: "/equipo-edit/:id", component: EquipoEdit},
    {path: "/equipo-del/:id", component: EquipoDel}
]

export default RouteModEquipos;