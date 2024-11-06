import React from 'react'

const FromComponents = ({title, type, isRequired,name, handleChange, data}) => {

  
  return (
    <div className="mb-4">
          <label className="block text-gray-700">{title}
            {isRequired && <sub className='text-red-600'>*</sub>}
          </label>

          {isRequired === true ? (<input
            type={type}       
            name={name}
            value={data}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />):(
            <input
            type={type}       
            name={name}
            onChange={handleChange}
            value={data}
            className="w-full p-2 border border-gray-300 rounded"
          />
          )
          }
   </div>
  )
}

export default FromComponents