import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Section = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
        const maxHeight = lineHeight * 2; // max height for two lines
        setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="max-w-2xl md:mx-auto my-4 p-6 bg-white text-black shadow-lg shadow-sky-700 rounded-lg relative top-20 mx-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        {props.title}
      </h2>

      <div
        ref={contentRef}
        className={`flex flex-wrap transition-all duration-100 ${
          showMore ? 'max-h-full' : 'max-h-[3.5rem] overflow-hidden'
        }`}
      >
        {props.children}
      </div>

      {isOverflowing && (
        
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className={`text-gray-600 mt-4 flex items-center justify-center mx-auto ${showMore ? '' : 'animate-bounce'}`}
        >
          {/* {showMore ? 'Show Less' : 'Show More'} */}
          <FaChevronUp className={`ml-2 transition-transform duration-300 ${!showMore ? 'rotate-180' : ''}`} />

        </button>
      )}
    </div>
  );
};

export default Section;
