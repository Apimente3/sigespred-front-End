import React, {Component} from 'react';

class FooterAdmin extends Component {
    render() {
        return (
            <div>
                <footer className="footerproce">
                    <div className="container ">
                        <div className="limiter pb24 footer-proce">
                            <div className="txt-s color-darken50">
                                <a className="color-blue-on-hover mr18"
                                   href="https://www.mtc.gob.pe/">© MTC</a><a
                                className="color-blue-on-hover mr18" href="#">Direccion de Disponibilidad de Predios</a><a
                                className="color-blue-on-hover mr18" href="#">Ayuda</a><a
                                className="color-blue-on-hover"
                                href="#">Predios</a>
                            </div>
                        </div>
                    </div>

                </footer>
            </div>
        );
    }
}

export default FooterAdmin;