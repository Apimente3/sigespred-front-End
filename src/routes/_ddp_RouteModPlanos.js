import Planos from "../sigespred/_ddp_planos/Planos";
import PlanoAdd from "../sigespred/_ddp_planos/PlanoAdd";
import PlanoEdit from "../sigespred/_ddp_planos/PlanoEdit";

const RouteModPlanos = [
    {path: "/", component: Planos},
    {path: "/planos", component: Planos},
    {path: "/plano-add", component: PlanoAdd},
    {path: "/plano-edit", component: PlanoEdit},
]

export default RouteModPlanos;

