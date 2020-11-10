import Indicadores from "../sigespred/_ddp_indicador/Indicadores";
import IndicadorAdd from "../sigespred/_ddp_indicador/IndicadorAdd";
import IndicadorEdit from "../sigespred/_ddp_indicador/IndicadorEdit";
import IndicadorDel from "../sigespred/_ddp_indicador/IndicadorDel";
import IndicadorVisor from "../sigespred/_ddp_indicador/IndicadorVisor";

const RouteModIndicadores = [
    {path: "/indicadores", component: Indicadores},
    {path: "/indicador-add", component: IndicadorAdd},
    {path: "/indicador-edit/:id", component: IndicadorEdit},
    {path: "/indicador-del/:id", component: IndicadorDel},
    {path: "/indicador-visor/:id", component: IndicadorVisor},


]

export default RouteModIndicadores;