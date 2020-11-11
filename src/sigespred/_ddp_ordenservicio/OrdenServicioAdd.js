import React from "react";
import { toastr } from "react-redux-toastr";
import { Form, FormGroup, Input, Row12, Row6, RowForm } from "../../components/forms";
import { LISTADO_PARTIDA_BREADCRUM } from "../../config/breadcrums";
import WraperLarge from "../m000_common/formContent/WraperLarge";

export const OrdenServicioAdd = () => {
  const registrar = async (e) => {
    e.preventDefault();
    try {
      // await saveGestioPredial(gestionPredial)
      toastr.success("Registro Correcto", "Se registro correctamente.", {
        position: "top-right",
      });
    } catch (e) {
      toastr.error("Registro Incorrecto", JSON.stringify(e), {
        position: "top-right",
      });
    }
  };
  return (
    <>
      <WraperLarge
        titleForm={"Registrar una Orden de Servicio"}
        listbreadcrumb={LISTADO_PARTIDA_BREADCRUM}
      >
        <Form onSubmit={registrar}>
          <RowForm>
            <Row6 title={"Datos de los requerimientos"}>
              <FormGroup label={"Requerimiento"} require={true}>
                <Input
                  required={true}
                //   value={gestionPredial.resoministerial}
                //   onChange={handleInputChange}
                //   name={"resoministerial"}
                  placeholder={"Ingrese el nro de Requerimiento"}
                  type={"text"}
                ></Input>
              </FormGroup>
            </Row6>
          </RowForm>
        </Form>
      </WraperLarge>
    </>
  );
};

