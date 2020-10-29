import Area from "../sigespred/_ddp_area/Area";
import AreaAdd from "../sigespred/_ddp_area/AreaAdd";
import AreaEdit from "../sigespred/_ddp_area/AreaEdit";
import AreaDel from "../sigespred/_ddp_area/AreaDel";

const RouteModAreas = [
    {path: "/area-list", component: Area},
    {path: "/area-add", component: AreaAdd},
    {path: "/area-edit/:id", component: AreaEdit},
    {path: "/area-del/:id", component: AreaDel}
]

export default RouteModAreas;