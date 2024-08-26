import React, { useState } from 'react';
import FormInput from './FormInput';
import './form.css';

export default function FormSection({ input, resume, section, name }) {
    const [sectionData, setSectionData] = useState(resume[section] || []);

    const addSection = () => {
        const updatedSection = [...sectionData, { ...input }];
        setSectionData(updatedSection);
        resume[section] = updatedSection;
    };

    const update = (updatedSection) => {
        setSectionData(updatedSection);
        resume[section] = updatedSection;
    };

    return (
        <div className='fs-container'>
            {sectionData.map((item, idx) => (
                <div key={`section-${idx}`}>
                    <FormInput
                        section={sectionData}
                        id={idx}
                        update={update}
                        input={input}
                        name={section}
                        resume={resume}
                    />
                    <button className='fs-btn' onClick={addSection}>
                        Add {name}
                    </button>
                </div>
            ))}
           
        </div>
    );
}
