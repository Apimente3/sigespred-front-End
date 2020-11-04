import SolicitudAdd  from "../sigespred/_ddp_solicitud/SolicitudAdd";
import SolicitudList  from "../sigespred/_ddp_solicitud/SolicitudList";
import SolicitudEdit from "../sigespred/_ddp_solicitud/SolicitudEdit";
import SolicitudRespuesta from "../sigespred/_ddp_solicitud/solicitudRespuesta";

const RouteModSolicitud = [
    {path: "/solicitud-list", component: SolicitudList},
    {path: "/solicitud-add", component: SolicitudAdd},
    {path: "/solicitud-edit/:id", component: SolicitudEdit},
    {path: "/solicitud-respuesta/:id", component: SolicitudRespuesta}
]

export default RouteModSolicitud;