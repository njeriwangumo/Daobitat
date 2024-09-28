import React, { useState } from 'react';
import "./SearchBox.css";

const SearchBox: React.FC = () => {
    const [searchLocationTerm, setSearchLocationTerm] = useState("");
    const [searchCategoryTerm, setSearchCategoryTerm] = useState("");
    const [searchBudgetTerm, setSearchBudgetTerm] = useState("");
    const [searchModeTerm, setSearchModeTerm] = useState("");
    const [searchPropTypeTerm, setSearchPropTypeTerm] = useState("");

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocationTerm(e.target.value);
    };


    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCategoryTerm(e.target.value);
    };

    
    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBudgetTerm(e.target.value);
    };

    const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchModeTerm(e.target.value);
    };

    const handlePropTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPropTypeTerm(e.target.value);
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

            <input
                type="text"
                placeholder="Choose Category"
                value={searchCategoryTerm} 
                onChange={handleCategoryChange}
                className="searchbox"
            />

            <input
                type="text"
                placeholder="Estimated Budget"
                value={searchBudgetTerm}
                onChange={handleBudgetChange}
                className="searchbox"
            />

            <input
                type="text"
                placeholder="Mode Of Payment"
                value={searchModeTerm}
                onChange={handleModeChange}
                className="searchbox"
            />

            <input
                type="text"
                placeholder="Property Type"
                value={searchPropTypeTerm}
                onChange={handlePropTypeChange}
                className="searchbox"
            />
            <p>Searching for: a property in {searchLocationTerm} {searchCategoryTerm} {searchBudgetTerm}</p>
            
        </div>
    );
}

export default SearchBox;
