import React, {Component} from 'react';
import ContentLoader from "react-content-loader";

class ProyectoLoader extends Component {
    render() {
        return (
            <div className="search-container">

                <div className="panel panel-default">
                    <ContentLoader
                        height={150}
                        width={840}
                        speed={2}
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="81" y="24" rx="4" ry="4" width="591" height="8" />
                        <rect x="169" y="80" rx="3" ry="3" width="175" height="10" />
                        <rect x="23" y="160" rx="3" ry="3" width="98" height="5" />
                        <circle cx="36" cy="32" r="18" />
                        <rect x="38" y="134" rx="3" ry="3" width="68" height="4" />
                        <rect x="171" y="141" rx="3" ry="3" width="175" height="10" />
                        <rect x="171" y="202" rx="3" ry="3" width="175" height="9" />
                        <rect x="413" y="80" rx="3" ry="3" width="175" height="10" />
                        <rect x="412" y="140" rx="3" ry="3" width="175" height="10" />
                        <rect x="410" y="202" rx="3" ry="3" width="175" height="10" />
                        <rect x="638" y="201" rx="3" ry="3" width="175" height="10" />
                        <rect x="631" y="139" rx="3" ry="3" width="175" height="10" />
                        <rect x="629" y="81" rx="3" ry="3" width="175" height="10" />
                    </ContentLoader>
                </div>
            </div>
        );
    }
}

export default ProyectoLoader;