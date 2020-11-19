import Partida from "../sigespred/_ddp_partidas/Partida";
import PartidaAdd  from "../sigespred/_ddp_partidas/PartidaAdd";
import PartidaDel from "../sigespred/_ddp_partidas/PartidaDel";
import PartidaEdit from "../sigespred/_ddp_partidas/PartidaEdit";
import PartidaRespuesta from "../sigespred/_ddp_partidas/PartidaRespuesta";
import { PartidaUpload } from "../sigespred/_ddp_partidas/PartidaUpload";

const RouteModPartidas = [
    {path: "/", component:Partida},
    {path: "/partidas", component: Partida},
    {path: "/partida-add", component: PartidaAdd},
    {path: "/partida-edit/:id", component: PartidaEdit},
    {path: "/partida-del/:id", component: PartidaDel},
    {path: "/partida-respuesta/:id", component: PartidaRespuesta},
    {path: "/partida-upload", component: PartidaUpload},
]

export default RouteModPartidas;