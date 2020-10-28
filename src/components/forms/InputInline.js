import React, {useEffect} from 'react';
const {$} = window;

const InputInline = ({label,require=true,withLabel=4, withControl=8,required,type,placeholder,name,onChange,value,pattern,title,maxLength,ayuda=""}) => {





    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    let wLabel=`col-lg-${withLabel} control-label`;
    let wControl=`col-lg-${withControl}`;
    return (
        <>
            <label className={wLabel}>
                {require ? <span className="obligatorio">* </span>:''}
                {label}

                    { ayuda.length >0 ? <span className="post-like text-muted tooltip-test mleft-5" data-toggle="tooltip"
                                              data-original-title={ ayuda }>
										<i className="fa fa-question-circle-o" aria-hidden="true"></i>
										</span>
                        : null }

                </label>
            <div className={wControl}>
                <input required={ require ? "required": ""}
                       type={type}
                       className="form-control input-sm"
                       placeholder={placeholder}
                       name={name}
                       onChange={onChange}
                       value={value}
                       pattern={pattern}
                       title={title}
                       maxLength={maxLength}
                >
                </input>


            </div>

        </>
    );
};

export default InputInline;