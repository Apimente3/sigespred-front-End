import React from 'react';

const Toastr = () => {
    return (
        <div id="toast-container" className="toast-center-center">
            <div className="toast toast-info" aria-live="polite" style="">
                <div className="toast-message">

                    <div className="panel-body">

                        <p>Se elimino este predio correctamente, ya no sera visible para los demas usuarios vinculados
                            al PREDIO ...</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Toastr;