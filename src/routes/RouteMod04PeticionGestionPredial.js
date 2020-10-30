import Solicitudes from "../components/administracion/solicitudes/Solicitudes";
import SolicitudAdd from "../components/administracion/solicitudes/SolicitudAdd";
import SolicitudEdit from "../components/administracion/solicitudes/SolicitudEdit";
import SolicitudDel from "../components/administracion/solicitudes/SolicitudDel";
import SolicitudAddPred from "../components/administracion/solicitudes/SolicitudAddPred";

const RouteMod04PeticionGestionPredial = [
    {path: "/solicitudes1", component: Solicitudes},
    {path: "/solicitud-add1", component: SolicitudAdd},
    {path: "/solicitud-edit1/:id", component: SolicitudEdit},
    {path: "/solicitud-del1/:codsolicitud", component: SolicitudDel},
    {path: "/solicitud-add-pred1/:id", component: SolicitudAddPred}
]
export default RouteMod04PeticionGestionPredial;