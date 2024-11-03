import React, { useState } from 'react';
import Section from '../Section';
import AddSkills from './AddSkills';
import Modal from './Modal'; // Import the Modal component
import { IoIosAddCircleOutline } from "react-icons/io";

const Skills = () => {
  const [skills, setSkills] = useState(['React']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addSkillHandler = (newSkill) => {
    setSkills((prevSkills) => [...prevSkills, newSkill]);
  };

  const removeSkillHandler = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };
 
  return (
    <>
      <Section title='Skills' onAddClick={() => setIsModalOpen(true)}>
        

        {/* Render skills */}
        <div className=" flex flex-wrap"> {/* Added spacing between skills */}
          {skills.map((skill) => (
            <AddSkills
              key={skill}
              title={skill}
              removeHandler={() => removeSkillHandler(skill)}
            />
          ))}
        </div>

        {/* Modal for adding new skill */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddSkill={addSkillHandler} 
        />
      </Section>

    </>
  );
};

export default Skills;
