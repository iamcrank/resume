import React from 'react';
import FormSection from '../common/FormSection';

export default function Education({ resume }) {
    const school = {
        university: "",
        degree: "",
        startYear: "",
        endYear: "",
        gpa: ""
    };

    return (
        <div>
            <h2>Educational Details</h2>
            <FormSection 
                input={school} 
                name="School" 
                section="education" 
                resume={resume} 
            />
        </div>
    );
}
