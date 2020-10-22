import RouteMod01Login from './RouteMod01Login';
import RouteMod02GestionTrabajadores from './RouteMod02GestionTrabajadores';
import RouteMod03GestionProyectos from './RouteMod03GestionProyectos';
import RouteMod04PeticionGestionPredial from './RouteMod04PeticionGestionPredial';
import RouteMod05DiagnosticoTecnicoLegal from './RouteMod05DiagnosticoTecnicoLegal';
import RouteMod05Predios from './RouteMod05Predios';
import RouteGestionPredial from './RouteGestionPredial';
import RoutePaginasGenerales from './RoutePaginasGenerales';
import RouteMod06ProcesoAdquisicionExpropiacion from './RouteMod06ProcesoAdquisicionExpropiacion';

import RouteModPlanos from './_ddp_RouteModPlanos';
import RouteModPartidas from './_ddp_RouteModPartidas';
import RouteModEquipo from './_ddp_RouteModEquipo';

export default [
    ...RouteMod01Login,
    ...RouteModEquipo,
    ...RouteModPartidas,
    ...RouteModPlanos,
    ...RouteGestionPredial,
    ...RouteMod02GestionTrabajadores,
    ...RouteMod03GestionProyectos,
    ...RouteMod05DiagnosticoTecnicoLegal,
    ...RouteMod04PeticionGestionPredial,
    ...RouteMod05Predios,
    ...RouteMod06ProcesoAdquisicionExpropiacion
]