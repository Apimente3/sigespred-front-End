
import { Categoria } from "../sigespred/_ddp_blog/Categoria";
import { CategoriaAdd } from "../sigespred/_ddp_blog/CategoriaAdd";
import { CategoriaEdit } from "../sigespred/_ddp_blog/CategoriaEdit";


const RouteModCategoria = [
    {path: "/categoria", component: Categoria},
    {path: "/categoria-add", component: CategoriaAdd},
    {path: "/categoria-edit/:id", component: CategoriaEdit},
]

export default RouteModCategoria;