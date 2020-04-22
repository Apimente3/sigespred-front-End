import React from 'react';
import ContentLoader from "react-content-loader"

const TrabajadorLoad = () => {
    return (
        <>
            <ContentLoader
                height={100}
                width={1125}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="0" y="100" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="120" rx="3" ry="3" width="201" height="6" />
                <circle cx="53" cy="46" r="30" />
                <rect x="101" y="22" rx="0" ry="0" width="986" height="48" />
                <rect x="254" y="50" rx="0" ry="0" width="0" height="0" />
            </ContentLoader>
           
        </>
    );
};

export default TrabajadorLoad;