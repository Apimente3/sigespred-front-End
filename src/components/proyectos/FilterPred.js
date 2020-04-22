import React, {Component} from 'react';
import FilterDepartamento from "./FilterDepartamento";
import FilterConcesion from "./FilterConcesion";
import FilterProyecto from "./FilterProyecto";
import FilterObras from "./FilterObras";
import FilterProceso from "./FilterProceso";
import FilterBrigada from "./FilterBrigada";
import FilterEstadoPred from "./FilterEstadoPred";

class FilterPred extends Component {
    render() {
        return (
            <div>
                <FilterConcesion/>
                <FilterProceso/>
                <FilterDepartamento/>
                <FilterBrigada/>
                <FilterEstadoPred/>
            </div>
        );
    }
}

export default FilterPred;