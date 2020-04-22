import Solicitudes from "../components/administracion/solicitudes/Solicitudes";
import SolicitudAdd from "../components/administracion/solicitudes/SolicitudAdd";
import SolicitudEdit from "../components/administracion/solicitudes/SolicitudEdit";
import SolicitudDel from "../components/administracion/solicitudes/SolicitudDel";
import SolicitudAddPred from "../components/administracion/solicitudes/SolicitudAddPred";

const RouteMod04PeticionGestionPredial = [
    {path: "/solicitudes", component: Solicitudes},
    {path: "/solicitud-add", component: SolicitudAdd},
    {path: "/solicitud-edit/:id", component: SolicitudEdit},
    {path: "/solicitud-del/:codsolicitud", component: SolicitudDel},
    {path: "/solicitud-add-pred/:id", component: SolicitudAddPred}
]
export default RouteMod04PeticionGestionPredial;