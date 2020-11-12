import {Children, useState} from 'react';

const Tab = ({children}) => {
    const [activeTab, setActiveTab] = useState(0)
    const tabs = Children.toArray(children);
    const currentTabs = tabs[activeTab]

    return (
        <>
            <div className="panel panel-default">
                <div className="panel-tab clearfix">
                    <ul className="tab-bar">
                        <li className=""><a href="#home1" data-toggle="tab"><i className="fa fa-home"></i> Home</a></li>
                        <li className="active"><a href="#profile1" data-toggle="tab"><i
                            className="fa fa-pencil"></i> Profile</a></li>
                        <li className=""><a href="#message1" data-toggle="tab"><i
                            className="fa fa-envelope"></i> Message</a></li>
                    </ul>
                </div>
                <div className="panel-body">
                    <div className="tab-content">
                        <div className="tab-pane fade">
                            {currentTabs}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};>

export default Tab;