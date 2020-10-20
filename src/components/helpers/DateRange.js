import React, {useEffect, useState} from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const RangeDate = ({id, nombrefuncion}) => {

    const handleApply = (event, picker) => {
        picker.element.val(
          picker.startDate.format('DD/MM/YYYY') +
            ' - ' +
            picker.endDate.format('DD/MM/YYYY')
        );
      };
      const handleCancel = (event, picker) => {
        picker.element.val('');
      };
    
    return (
        <>
            <DateRangePicker onApply={handleApply} onCancel={handleCancel} onCallback={() => nombrefuncion()}
            initialSettings={{
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Limpiar',
                    applyLabel: 'Aplicar',
                    weekLabel: 'S',
                    customRangeLabel: 'Rango Personalizado',
                    daysOfWeek: [ 'Do',
                    'Lu',
                    'Ma',
                    'Mi',
                    'Ju',
                    'Vi',
                    'Sá'],
                    monthNames: [ 'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Setiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre' ],
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                ranges: {
                    Hoy: [moment().toDate(), moment().toDate()],
                    Ayer: [
                    moment().subtract(1, 'days').toDate(),
                    moment().subtract(1, 'days').toDate(),
                    ],
                    'Últimos 7 días': [
                    moment().subtract(6, 'days').toDate(),
                    moment().toDate(),
                    ],
                    'Últimos 30 días': [
                    moment().subtract(29, 'days').toDate(),
                    moment().toDate(),
                    ],
                    'Este mes': [
                    moment().startOf('month').toDate(),
                    moment().endOf('month').toDate(),
                    ],
                    'Último mes': [
                    moment().subtract(1, 'month').startOf('month').toDate(),
                    moment().subtract(1, 'month').endOf('month').toDate(),
                    ],
                },
                }}>
                <input id={id} name={id} type="text" className="form-control" />
            </DateRangePicker>
        </>
    );
};

export default RangeDate;