import React from 'react';
import Template1 from './template1/Template1';
import Template2 from './template2/Template2';

const HiddenResume = ({ id }) => {
    const renderTemplate = () => {
        switch (id) {
            case 'template1':
                return <Template1 />;
            case 'template2':
                return <Template2 />;
            default:
                return null;
        }
    };

    return <>{renderTemplate()}</>;
};

export default HiddenResume;
