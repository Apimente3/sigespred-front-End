import React, {useEffect} from 'react';
const {$} = window;

const FromGroup = ({children,label,require,withLabel=4, withControl=8,ayuda=""}) => {
    let wLabel=`col-lg-${withLabel} control-label`;
    let wControl=`col-lg-${withControl}`;

    useEffect(() => {
        const init = async () => {
            $('[data-toggle="tooltip"]').tooltip()
        };
        init();
    }, []);

    return (
        <div className="form-group ">
            <label className={wLabel}>{require? <span className="obligatorio">* </span>:''}
                {label}
                { ayuda.length >0 ? <span className="post-like text-muted tooltip-test mleft-5" data-toggle="tooltip"
                                          data-original-title={ ayuda }>
										<i className="fa fa-question-circle-o" aria-hidden="true"></i>
										</span>
                    : null }
                </label>
            <div className={wControl}>
                {children}

            </div>


        </div>
    );
};

export default FromGroup;