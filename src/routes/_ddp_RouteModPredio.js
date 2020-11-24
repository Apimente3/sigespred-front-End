import PredioList from "../sigespred/_ddp_predio/PredioList";
import PredioAdd from "../sigespred/_ddp_predio/PredioAdd";
import PredioEditGen from "../sigespred/_ddp_predio/PredioEditGen";
import PredioEditTec from "../sigespred/_ddp_predio/PredioEditTec";
import PredioEditReg from "../sigespred/_ddp_predio/PredioEditReg";

const RouteModPredio = [
    { path: "/predio-list", component: PredioList},
    { path: "/predio-add", component: PredioAdd },
    { path: "/predio-gen-edit/:id/:codpred", component: PredioEditGen },
    { path: "/predio-tec-edit/:id/:codpred", component: PredioEditTec },
    { path: "/predio-reg-edit/:id/:codpred", component: PredioEditReg }
];

export default RouteModPredio;
