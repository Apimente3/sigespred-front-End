import Acta from "../sigespred/_ddp_acta/Acta";
import Acuerdo from "../sigespred/_ddp_acta/Acuerdo";
import ActaAdd from "../sigespred/_ddp_acta/ActaAdd";
import ActaEdit from "../sigespred/_ddp_acta/ActaEdit";
import ActaDel from "../sigespred/_ddp_acta/ActaDel";

const RouteModActas = [
    {path: "/acta-list", component: Acta},
    {path: "/acuerdo-list", component: Acuerdo},
    {path: "/acta-add", component: ActaAdd},
    {path: "/acta-edit/:id", component: ActaEdit},
    {path: "/acta-del/:id", component: ActaDel}
]

export default RouteModActas;