import React from 'react';
import FormSection from '../common/FormSection';

export default function Project({ resume }) {
    const project = {
        projectName: '',
        keywords: '',
        projectLink: '',
        projectDescription: [''],
    };

    return (
        <div>
            <h2>Project Details</h2>
            <FormSection input={project} name="Project" section="projects" resume={resume} />
        </div>
    );
}
