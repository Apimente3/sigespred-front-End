import DatosGeneralesDiag from "../sigespred/m005_diagnostico_tecnico_legal/DatosGenerales";
import InformacionCartografica from "../sigespred/m005_diagnostico_tecnico_legal/InformacionCartografica";
import Diagnostico from "../sigespred/m005_diagnostico_tecnico_legal/Diagnostico";
import SolicitudesVinculadas from "../sigespred/m005_diagnostico_tecnico_legal/solicitudes_vinculadas/SolicitudesVinculadas";
import Predios from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/Predios";
import Interferencias from "../sigespred/m005_diagnostico_tecnico_legal/m005_02_interferencias/Interferencias";
import InterferenciaAdd from "../sigespred/m005_diagnostico_tecnico_legal/m005_02_interferencias/InterferenciaAdd";


const RouteMod05DiagnosticoTecnicoLegal = [
    {path: "/proyecto-datos-generales/:codigo_predio", component: DatosGeneralesDiag},
    {path: "/proyecto-informacion/:codigo_predio", component: InformacionCartografica},
    {path: "/proyecto-diagnostico-tecnico-legal/:codigo_predio", component: Diagnostico},
    {path: "/proyecto-solicitudes-peticion/:codigo_predio", component: SolicitudesVinculadas},
    {path: "/proyecto-predios/:codigo_proyecto", component: Predios},
    {path: "/proyecto-interferencias/:codigo_proyecto", component: Interferencias},
    {path: "/registro-interferencia/:codigo_proyecto", component: InterferenciaAdd}

]
export default RouteMod05DiagnosticoTecnicoLegal;