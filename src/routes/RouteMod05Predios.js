import Predios from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/Predios";
import DatosPredio from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/DatosPredio";
import UbicacionPredio from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/UbicacionPredio";
import PropietarioPredio from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/PropietarioPredio";
import PolygonoPredio from "../sigespred/m005_diagnostico_tecnico_legal/m005_01_predios/PolygonoPredio";
import Expedientes from "../sigespred/m005_diagnostico_tecnico_legal/expedientes/Expedientes";



const RouteMod05DiagnosticoTecnicoLegal = [
    {path: "/listado-predios/:codigo", component: Predios},
    {path: "/datos-predio/:codigo", component: DatosPredio},
    {path: "/ubicacion-predio/:codigo", component: UbicacionPredio},
    {path: "/propietarios-predio/:codigo", component: PropietarioPredio},
    {path: "/polygono-predio/:codigo", component: PolygonoPredio},
    {path: "/expedientes/:codigo", component: Expedientes},


]
export default RouteMod05DiagnosticoTecnicoLegal;