import Planos from "../sigespred/_ddp_planos/Planos";
import PlanoAdd from "../sigespred/_ddp_planos/PlanoAdd";

const RouteModPlanos = [
    {path: "/", component: Planos},
    {path: "/planos", component: Planos},
    {path: "/plano-add", component: PlanoAdd},
]

export default RouteModPlanos;

