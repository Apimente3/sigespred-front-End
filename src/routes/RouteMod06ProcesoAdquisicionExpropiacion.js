import Procesos from "../sigespred/m006_proceso_adquisicion_expropiacion/Procesos";
import Proceso from "../sigespred/m006_proceso_adquisicion_expropiacion/Proceso";
import TablaDemo from "../sigespred/m006_proceso_adquisicion_expropiacion/TablaDemo";
import Adquisicion_expropiacion from "../sigespred/m006_proceso_adquisicion_expropiacion/Adquisicion_expropiacion";




const RouteMod05DiagnosticoTecnicoLegal = [
    {path: "/adquisicion-expropiacion/:expediente", component: Procesos},
    {path: "/trato-directo-y-expropiacion/:codigo_proyecto", component: Adquisicion_expropiacion},
    {path: "/tablademo", component: TablaDemo},
   

]
export default RouteMod05DiagnosticoTecnicoLegal;