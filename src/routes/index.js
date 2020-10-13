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

export default [
    ...RouteModPlanos,
    ...RouteMod01Login,
    ...RouteGestionPredial,
    ...RouteMod02GestionTrabajadores,
    ...RouteMod03GestionProyectos,
    ...RouteMod05DiagnosticoTecnicoLegal,
    ...RouteMod04PeticionGestionPredial,
    ...RouteMod05Predios,
    ...RouteMod06ProcesoAdquisicionExpropiacion


]