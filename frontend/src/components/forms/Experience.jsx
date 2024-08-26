import React from 'react';
import FormSection from '../common/FormSection';

export default function Experience({ resume }) {
    const workEx = {
        title: "",
        organisation: "",
        startDate: "",
        endDate: "",
        description: [""]
    };

    return (
        <div>
            <h2>Experience Details</h2>
            <FormSection input={workEx} name="Experience" section="experience" resume={resume} />
        </div>
    );
}
