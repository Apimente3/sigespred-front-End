import PredioList from "../sigespred/_ddp_predio/PredioList";
import PredioAdd from "../sigespred/_ddp_predio/PredioAdd";

const RouteModPredio = [
    { path: "/predio-list", component: PredioList},
    { path: "/predio-add", component: PredioAdd }
];

export default RouteModPredio;
