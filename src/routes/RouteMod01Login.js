import Login from "../sigespred/m001_login/Login";
import Trabajador from "../sigespred/m002_gestion_trabajadores/m002_01_trabajadores/TrabajadorAdd";

const RouteMod01Login = [
    {path: "/", component: Login},
    {path: "/trabajador", component: Trabajador}

]

export default RouteMod01Login;

