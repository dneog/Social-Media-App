import React from 'react';
import './Search.scss';
const Search = ({value, onChange}) => {
  return (
    <div className='dv'>
    <input className='inpt' type="text" placeholder='Search Peoples' value={value} onChange={onChange}  />
    </div>
  )
}

export default Search