import Page404 from "../sigespred/m000_common/Pages/404";

const RoutePaginasGenerales = [
    {default:true, component: Page404},
    {path: "/no-encontrado/:codigasd", component: Page404}
]


export default RoutePaginasGenerales;