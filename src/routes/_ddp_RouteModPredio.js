import { Predio } from "../sigespred/_ddp_predio/Predio";
import { PredioAdd } from "../sigespred/_ddp_predio/PredioAdd";

const RouteModPredio = [
    { path: "/modulo-predio", component: Predio},
    { path: "/modulo-predio-add", component: PredioAdd }
];

export default RouteModPredio;
