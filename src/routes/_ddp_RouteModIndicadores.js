import Indicadores from "../sigespred/_ddp_indicador/Indicadores";
import IndicadorAdd from "../sigespred/_ddp_indicador/IndicadorAdd";
import IndicadorEdit from "../sigespred/_ddp_indicador/IndicadorEdit";
import IndicadorDel from "../sigespred/_ddp_indicador/IndicadorDel";

const RouteModIndicadores = [
    {path: "/indicadores", component: Indicadores},
    {path: "/indicadores-add", component: IndicadorAdd},
    {path: "/indicadores-edit/:id", component: IndicadorEdit},
    {path: "/indicadores-del/:id", component: IndicadorDel}
]

export default RouteModIndicadores;