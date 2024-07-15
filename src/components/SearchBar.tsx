import React, { useState } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar : React.FC<SearchBarProps>  = ({onSearch}) => {
  const [filterValue, setFilterValue] = useState('');

  const debouncedOnSearch = debounce((value: string)=>{
    onSearch(value)
    
  }, 700); // wait 700ms after user enter's a value to limit API calls

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFilterValue(e.target.value);
    debouncedOnSearch(filterValue);
  }
  return (
    <input
      onChange={handleChange}
      type="text"
      placeholder='Search characters...'
      className='px-4 py-2 w-64 dark:text-zinc-900'
    />
  )
}

export default SearchBar