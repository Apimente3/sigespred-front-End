import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="padding-md">
                <div className="section-header">
                    <hr className="left visible-lg"></hr>
                    <span>
						CONCESIONES 
					</span>
                    <hr className="right visible-lg"></hr>
                </div>
            </div>
        );
    }
}

export default Header;