import React, {Component} from 'react';

class Ordering extends Component {
    render() {
        return (
            <div className="search-options clearfix">
                <strong className="margin20">10 Proyectos</strong>
                Ordenar por
                <select className="form-control input-sm select-search">
                    <option value="">Mas recientes</option>
                    <option value="">Mas Antiguos</option>
                    <option>Mayor Presupuesto</option>
                    <option>Menor Presupuesto</option>
                    <option>En proceso</option>
                    <option>Culminados</option>
                </select>

                <div className="search-pager">
                    <ul className="pagination pagination-sm pagination-split no-margin">
                        <li className="disabled"><a href="#">«</a></li>
                        <li className="active"><a href="#">1 <span
                            className="sr-only">(current)</span></a></li>

                        <li><a href="#">»</a></li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default Ordering;