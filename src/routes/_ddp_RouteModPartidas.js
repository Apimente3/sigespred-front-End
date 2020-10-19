import Partida from "../sigespred/_ddp_partidas/Partida";
import PartidaAdd  from "../sigespred/_ddp_partidas/PartidaAdd";

const RouteModPartidas = [
    {path: "/", component:Partida},
    {path: "/partidas", component: Partida},
    {path: "/partida-add", component: PartidaAdd},
]

export default RouteModPartidas;