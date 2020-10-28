import Planos from "../sigespred/_ddp_planos/Planos";
import PlanoAdd from "../sigespred/_ddp_planos/PlanoAdd";
import PlanoEdit from "../sigespred/_ddp_planos/PlanoEdit";
import PlanoCodigos from "../sigespred/_ddp_planos/PlanoCodigos";

const RouteModPlanos = [
    {path: "/", component: Planos},
    {path: "/planos", component: Planos},
    {path: "/plano-add/:ante?", component: PlanoAdd},
    {path: "/plano-edit/:id", component: PlanoEdit},
    {path: "/plano-grupo", component: PlanoCodigos},
]

export default RouteModPlanos;

