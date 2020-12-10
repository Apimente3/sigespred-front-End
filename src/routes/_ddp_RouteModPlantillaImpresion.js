import PlantillaList from "../sigespred/_ddp_plantillaimpresion/PlantillaImpList";
import PlantillaEdit from "../sigespred/_ddp_plantillaimpresion/PlantillaImpEdit";

const RouteModPlantillaImpresion = [
    {path: "/printtemp-list", component: PlantillaList},
    {path: "/printtemp-edit/:id?", component: PlantillaEdit}
]

export default RouteModPlantillaImpresion;

