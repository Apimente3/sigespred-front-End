//import Partida from "../sigespred/_ddp_solicitud/Partida";
import SolicitudAdd  from "../sigespred/_ddp_solicitud/SolicitudAdd";
// import PartidaDel from "../sigespred/_ddp_solicitud/PartidaDel";
// import PartidaEdit from "../sigespred/_ddp_solicitud/PartidaEdit";
// import PartidaRespuesta from "../sigespred/_ddp_solicitud/PartidaRespuesta";

const RouteModSolicitud = [
    // {path: "/", component:Partida},
    // {path: "/partidas", component: Partida},
    {path: "/solicitud-add", component: SolicitudAdd},
    // {path: "/partida-edit/:id", component: PartidaEdit},
    // {path: "/partida-del/:id", component: PartidaDel},
    // {path: "/partida-respuesta/:id", component: PartidaRespuesta},
]

export default RouteModSolicitud;