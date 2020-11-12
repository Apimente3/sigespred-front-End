import TramoList from "../sigespred/_ddp_tramo/TramoList";
import TramoEdit from "../sigespred/_ddp_tramo/TramoEdit";

const RouteModTramos = [
    {path: "/tramo-list/:id", component: TramoList},
    {path: "/tramo-edit/:id/:ti/:idtramo?", component: TramoEdit}
]

export default RouteModTramos;

