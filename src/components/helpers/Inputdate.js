import React, {useEffect, useState} from 'react';

const Inputdate = ({required, className,name,onChange,value,min_range,max_range}) => {

    useEffect(() => {
        async function init() {
            try {
                var dtToday = new Date();

                var month = dtToday.getMonth() + 1;
                var day = dtToday.getDate();
                var year = dtToday.getFullYear();
                if(month < 10)
                    month = '0' + month.toString();
                if(day < 10)
                    day = '0' + day.toString();
                var maxDate = year + '-' + month + '-' + day;

            

                var el = document.querySelector("#date");
                
                if(!min_range){
                    el.setAttribute("min",min_range); 
                }
                if(!max_range){
                    el.setAttribute("max",max_range);
                }
               
               
                
               
            } catch (error) {
                alert('Ocurrio un error')
                console.log(error);
            }
        }

        init();

    }, []);
    
    return (
        <>
            <input id="date"  type="date" placeholder=""

                   className={className}
                   name={name}
                   onChange={onChange}
                   value={value}
            ></input>
        </>
    );
};

export default Inputdate;