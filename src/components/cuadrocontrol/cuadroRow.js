import React, {Component} from 'react';

class CuadroRow extends Component {

    ramdomAvance = () => {
        return Math.floor(Math.random() * 101);
    }

    ramdomX = (n=10) => {
        return Math.floor(Math.random() * n);
    }
    
  

    btnramdom = () => {
        let classe = ''
        let num = Math.floor(Math.random() * 3);
        if (num == 0) {
            classe = 'btn-success'
        }
        if (num == 1) {
            classe = 'btn-danger'
        }
        if (num == 2) {
            classe = 'btn-warning'
        }
        return classe;
    }

    render() {
        return (
            <tr className="rowcellcuadro">
                <td><b>PM1G-AEROTUMBES-PR-0001</b>
                    <div className="progress progress-striped active">
                        <div className="progress-bar progress-bar-danger" style={{width: `${this.ramdomAvance()}%`}}>
                            <span className="sr-only">61% Complete</span>
                        </div>
                    </div>
                </td>
               
                <td><a  className={`btn ${this.btnramdom()}`} href="/proce-1/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-2/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-3/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-4/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-5/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-6/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-7/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-9/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-10/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-11/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-12/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-13/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-14/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-15/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>
                <td><a className={`btn ${this.btnramdom()}`} href="/proce-15/PM1G-AEROTUM-PR-001"><span title="Dias transcurridos">{this.ramdomX()}</span></a>
                </td>


            </tr>
        );
    }
}

export default CuadroRow;