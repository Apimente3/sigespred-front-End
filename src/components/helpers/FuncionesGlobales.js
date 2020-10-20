import moment from 'moment';
// import {initAxiosInterceptors} from '../../config/axios';

// const Axios = initAxiosInterceptors();

export const helperObtenerRangoFechas = (fechas, fortmatotexto = false) => {

    if(fechas){
        let resultado = fechas.split(" - ");
        if (resultado.length === 2) {
            let fechaInicio = resultado[0];
            let fechaFin = resultado[1];
            
            if (moment(fechaInicio,'DD/MM/YYYY', true).isValid() && moment(fechaFin,'DD/MM/YYYY', true).isValid()){
                if(fortmatotexto){
                    var formattedInicio = fechaInicio.substr(6,4) + fechaInicio.substr(3,2) + fechaInicio.substr(0,2) ;
                    var formattedFin = fechaFin.substr(6,4) + fechaFin.substr(3,2) + fechaFin.substr(0,2) ;
                    return {fechainicio: formattedInicio, fechafin: formattedFin};
                }     
                return {fechainicio: fechaInicio, fechafin: fechaFin};
            } else {
                console.log('El formata de las fechas es inválido.')
            }
        }
        console.log('Rango de fechas inválido.')
    }
    return '';
}