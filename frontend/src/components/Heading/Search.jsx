

const Search = (props) =>{
    {/* Search Bar */}
   return <>
       <input
      type="text"
      placeholder="Search..."
      value={props.searchQuery}
      onChange={props.handleSearchChange}
      className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
    />
    <button
      type="submit"
      className="py-2 px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
    >
      Search
    </button>
   </>
   
  
}

export default Search;