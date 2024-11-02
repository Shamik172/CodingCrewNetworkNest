import React from 'react';

const Modal = ({ isOpen, onClose, onAddSkill }) => {
  const [skill, setSkill] = React.useState('');

  const handleAddSkill = () => {
    if (skill.trim()) {
      onAddSkill(skill.trim());
      setSkill(''); // Clear input after adding
      onClose(); // Close modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter skill name"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded-md">
            Cancel
          </button>
          <button onClick={handleAddSkill} className="bg-blue-500 text-white p-2 rounded-md">
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
