import React, { useState } from 'react'
import { FormFooter, FormGroup, Input, Loading, Row6, RowForm } from '../../components/forms';
import { LISTADO_BLOG_BREADCRUM } from '../../config/breadcrums';
import WraperLarge from "../m000_common/formContent/WraperLarge";
import {useForm} from "../../hooks/useForm"
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import { initAxiosInterceptors } from "../../config/axios";

const { $ } = window;
const Axios = initAxiosInterceptors();

async function addCategoria(body) {
    console.log(body);
    const { data } = await Axios.post(`/categoria`, body);
    return data;
  }
  
export const CategoriaAdd = ({history}) => {
    //const [categoria, setCategoria,handleInputChange, reset ] = useForm({}, ['resoministerial','abreviatura']);
    const [categoria, setCategoria] = useState('');
    
    
    const handleInputChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value.toUpperCase()
        });

    }
    const registrar = async (e) => {
        e.preventDefault();
        try {
          await addCategoria(categoria);
          toastr.success("Registro Correcto", "Se registro correctamente.", {
            position: "top-center",
          });
          history.push("/categoria");
        } catch (e) {
          toastr.error("Registro Incorrecto", JSON.stringify(e), {
            position: "top-center",
          });
        }
      };
    
    return (
        <>
            <WraperLarge titleForm={"Agregar Categoria"} listbreadcrumb={LISTADO_BLOG_BREADCRUM}>
                <form onSubmit={registrar} className={"form-horizontal"}>
                    <RowForm>
                        <Row6 title={"Datos de la Categoria"}>
                            <FormGroup label={"Categoria"} require={true}>
                                <Input required={true} value={categoria.descripcion} onChange={handleInputChange}
                                    name={"descripcion"} placeholder={"Ingrese el nombre de la categoria"}
                                    type={"text"}>
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
                    
                    <div className="panel panel-default">
    
                    </div>
                </form>
            </WraperLarge>
        </>
    )
}
