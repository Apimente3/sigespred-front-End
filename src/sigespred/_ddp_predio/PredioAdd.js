import React from "react";
import { LISTAR_GESTIONPREDIAL_BREADCRUM } from "../../config/breadcrums";
import Wraper from "../m000_common/formContent/WraperLarge";

export const PredioAdd = () => {
  return (
    <>
      <Wraper
        titleForm={"Listado de Predios"}
        listbreadcrumb={LISTAR_GESTIONPREDIAL_BREADCRUM}
      >
        <legend className="mleft-20">
          <i className="fa fa-filter"></i> Filtros de Búsqueda de Predios
        </legend>

        <div className="form-group">
          <label className="col-lg-2 control-label">Proyecto</label>
          <div className="col-lg-4">
            <select
              className="form-control input-sm"
              id="gestionpredialid"
              name="gestionpredialid"
              //   onChange={(e) => {
              //     handleChangeProyecto(e);
              //     handleInputChange(e);
              //   }}
            >
              <option value="">--SELECCIONE--</option>
              {/* {resListaProyectos.result ? (
                <ComboOptions
                  data={resListaProyectos.result}
                  valorkey="id"
                  valornombre="denominacion"
                />
              ) : (
                "Cargando..."
              )} */}
            </select>
          </div>
          
        </div>

      </Wraper>
    </>
  );
};
