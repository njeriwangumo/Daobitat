import React, { useState, useEffect, useRef } from 'react';
import './SearchBox.css';

const SearchBox: React.FC = () => {
  const [searchLocationTerm, setSearchLocationTerm] = useState<string>("");
  const [searchCategoryTerm, setSearchCategoryTerm] = useState<string>("");
  const [searchBudgetTerm, setSearchBudgetTerm] = useState<string>("");
  const [searchModeTerm, setSearchModeTerm] = useState<string>("");
  const [searchPropTypeTerm, setSearchPropTypeTerm] = useState<string>("");

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocationTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategoryTerm(e.target.value);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBudgetTerm(e.target.value);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchModeTerm(e.target.value);
  };

  const handlePropTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchPropTypeTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here using the search parameters
    console.log(
      'Searching for:',
      searchLocationTerm,
      searchCategoryTerm,
      searchBudgetTerm,
      searchModeTerm,
      searchPropTypeTerm
    );
  };

  return (
    <div>
      <h1>Tell us about your perfect property</h1>

      <input
        type="text"
        placeholder="Enter Location"
        value={searchLocationTerm}
        onChange={handleLocationChange}
        className="searchbox"
      />

      <select
        value={searchCategoryTerm}
        onChange={handleCategoryChange}
        className="searchbox"
      >
        <option value="" disabled>Select Category</option>
        <option value="For Sale">For Sale</option>
        <option value="For Rent">For Rent</option>
        <option value="Sold">Sold</option>
        <option value="Not Specified">Not Specified</option>
      </select>   


      <select
        value={searchBudgetTerm}
        onChange={handleBudgetChange}
        className="searchbox"
      >
        <option value="" disabled>Estimated budget</option>
        <option value="0-$10k">0-$10k</option>
        <option value="$10K-$50K">$10K-$50K</option>
        <option value="Above 50k">Above 50K</option>
        <option value="Not Specified">Not Specified</option>
         
      </select>


      <select
        value={searchPropTypeTerm}
        onChange={handlePropTypeChange}
        className="searchbox"
      >
        <option value="" disabled>Property type</option>
        <option value="Apartment">Apartment</option>
        <option value="Townhouses/Standalones">Townhouses/Standalones</option>
        <option value="Lots/Land">Lots/Land</option>
        <option value="Commercial property">Commercial property</option>
        <option value="Not Specified">Not Specified</option>

      </select>


      <select
        value={searchModeTerm}
        onChange={handleModeChange}
        className="searchbox"
      >
        <option value="" disabled>Mode of Payment</option>
        <option value="Crypto">Crypto</option>
        <option value="Cash">Cash</option>
        <option value="Cash">Hybrid</option>
        <option value="Not Specified">Not Specified</option>
    
      </select>

      

      
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBox;