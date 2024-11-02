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
      <Section title='Skills'>
        <div className="relative group"> {/* This div sets up for hover effect */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="rounded-full p-2 text-xl font-semibold relative z-10 -top-2" // Ensuring the button is on top
          >
            <IoIosAddCircleOutline size={40} />
          </button>
          {/* Hidden text that appears on hover */}
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full text-sm text-white bg-green-500 border border-gray-300 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 w-24 text-center shadow-lg z-0">
            Add Skill
          </span>
        </div>

        {/* Render skills */}
        {skills.map((skill) => (
          <AddSkills
            key={skill}
            title={skill}
            removeHandler={() => removeSkillHandler(skill)}
          />
        ))}

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
