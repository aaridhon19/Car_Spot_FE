import React from 'react';

export default function SearchParking({ onSearch }) {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    }

    return (
        <div className='search-container'>
            <input className='search-input' type="text" placeholder="Search Spot Parking..." onChange={handleSearch} />
        </div>
    );
}
