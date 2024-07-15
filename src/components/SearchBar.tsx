import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash';

// interface SearchBarProps {
//   alert: (value: string) => void
// }

const SearchBar: React.FC = () => {
  const [filterValue, setFilterValue] = useState('');

  const debouncedSearchRef = useRef<(value: string) => void>(
    debounce((value: string) => {
      alert(value);
    }, 1000)
  );

  useEffect(() => {
    debouncedSearchRef.current = debounce((value: string) => {
      alert(value);
    }, 1000);
    return () => {
      debouncedSearchRef.current;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    debouncedSearchRef.current(value);
  };

  return (
    <div>
      <input 
        onChange={handleChange} 
        value={filterValue}
        type="text" 
        placeholder="Search characters..." 
        className='text-black' 
      />
    </div>
  )
}

export default SearchBar