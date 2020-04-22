import React, {useEffect} from 'react';
const {$} = window;

function wysihtml5() {
    $('#textareawi').wysihtml5();
}
const TextArea = ({setValue}) => {
    useEffect(() => {
        setTimeout(()=>{
            wysihtml5()
        },100)
       
    }, []);
    
    const getHtml=()=>{
        setValue( $('#textareawi').val())
        
        console.log($('#textareawi').val())
    }
    
    return (
        <>
            <textarea id="textareawi" onChange={getHtml} className="textarea form-control wysihtml5-editor" placeholder="Ingrese las actividades en una Lista ..."
                      style={{height:'220px'}}
            ></textarea> 
        </>
    );
};

export default TextArea;