import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class HeaderSearch extends Component {
    state={
        todos:true,
        vias:false,
        ferrocarril:false,
        aero:false,
        puertos:false
    };

    selectAll=(e)=>{
        this.setState({
            todos:true,
            vias:false,
            ferrocarril:false,
            aero:false,
            puertos:false
        })
    }
    selectVia=(e)=>{
        e.preventDefault()
        this.setState({
            todos:false,
            vias:true,
            ferrocarril:false,
            aero:false,
            puertos:false
        })
    }
  
    
   
    
    render() {
       const { todos,vias,ferrocarril,aero, puertos} = this.state;
        return (
            <div className="search-filter">
                <ul>
                    {
                        todos?
                        (<li className="active"><a href="#" onClick={this.selectAll} >All</a></li>)
                        :
                        (<li><a href="#" onClick={this.selectAll}>All</a></li>)
                    }

                    {
                        vias?
                            (<li className="active"><a href="#" onClick={this.selectVia} ><i className="fa fa-car" aria-hidden="true"></i>Viales</a></li>)
                            :
                            (<li><a href="#" onClick={this.selectVia}><i className="fa fa-car" aria-hidden="true"></i> Viales</a></li>)
                    }
                    
                  
                    <li><a href="#" ><i className="fa fa-train" aria-hidden="true"></i> Ferroviarios</a></li>
                    <li><a href="#" ><i className="fa fa-plane"
                                                          aria-hidden="true"></i> Aeroportuarios</a></li>
                    <li><a href="#" ><i className="fa fa-anchor" aria-hidden="true"></i> Portuarios</a></li>
                 
                </ul>

               
            </div>
        );
    }
}

export default HeaderSearch;