import { useState } from 'react';

function TextToggle({desc}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mx-4 my-1 text-sm font-cursive text-lime-100 ">
      <div className={`${showMore ? '' : 'line-clamp-2'} overflow-hidden`}>
       {desc}
      </div>
      <button
        onClick={toggleShowMore}
        className="text-gray-950 mt-2 hover:text-gray-800 transition duration-200"
      >
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}

export default TextToggle;
