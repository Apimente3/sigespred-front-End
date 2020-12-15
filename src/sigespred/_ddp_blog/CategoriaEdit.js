import React, { useEffect } from 'react'
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { Form, FormFooter, FormGroup, Input, Row12, Row6, RowForm } from '../../components/forms';
import { LISTADO_DOCINTERNOS_BREADCRUM } from '../../config/breadcrums';
import { useForm } from '../../hooks/useForm';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import { initAxiosInterceptors } from "../../config/axios";


const Axios = initAxiosInterceptors();
const { $ } = window;

async function obtenerCategoria(id) {
    const { data } = await Axios.get(`/categoria/${id}`);
    return data;
  }
 
  async function updateCategoria(categoria) {
    const { data } = await Axios.put(`/categoria/${categoria.id}`, categoria);
    return data;
  }
export const CategoriaEdit = ({match, history}) => {
    
    const { id } = match.params;
    const [ categoria, SetCategoria, handleInputChange, reset] = useForm({},["descripcion"]);

    useEffect (() => {
        const init = async () => {
        let categoria = await obtenerCategoria(id);
        SetCategoria(categoria);
        }
        init();
    }, []);


    const actualizar = async (e) => {
        e.preventDefault();

        $("#btnguardar").button("loading");
        try {
          await updateCategoria(categoria);
          toastr.success("Actualización de la categoria","La categoria fue actualizado correctamente.",{ position: "top-center" });
          $("#btnguardar").button("reset");
          history.push("/categoria");
        } catch (e) {
          toastr.error("Registro Incorrecto", JSON.stringify(e), {
            position: "top-center",
          });
        }
    }

    return (
        <>
            <WraperLarge titleForm={"Edicion de la categoria " + categoria.id} listbreadcrumb={LISTADO_DOCINTERNOS_BREADCRUM}>
                <Form onSubmit={actualizar}>
                    <RowForm>
                        <Row6 title={"Datos de la categoria"}>
                            <FormGroup label={"Categoria"} require={true}>
                                <Input value={categoria.descripcion || ""} onChange={handleInputChange}
                                    name={"descripcion"} placeholder={"Ingrese la descripcion de la categoria"}
                                    required={true} type={"text"}>
                                </Input>
                            </FormGroup>
                        </Row6>        
                    </RowForm>
                    <FormFooter>
                        <Link
                        to={`/categoria`}
                        className="btn btn-default btn-sm btn-control"
                        >
                        Cancelar
                        </Link>
                        <button
                        id="btnguardar"
                        type="submit"
                        className="btn btn-danger btn-sm btn-control"
                        >
                        Guardar
                        </button>
                    </FormFooter>
                </Form>
            </WraperLarge>
                
        </>
    )
}
