import React from 'react';
import FormSection from '../common/FormSection';

export default function Skill({ resume }) {
    const skill = {
        skillName: '',
        keywords: ['']
    };

    return (
        <div>
            <h2>Skills</h2>
            <FormSection input={skill} name="Skill" section="skills" resume={resume} />
        </div>
    );
}
