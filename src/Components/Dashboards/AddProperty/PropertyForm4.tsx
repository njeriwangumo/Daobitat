import React, { useState } from 'react';
import './PropertyForm4.css';
import DefiTerms from './DaoTerms/DefiTerms';

const PropertyForm4: React.FC = () => {
  const [specificType, setSpecificType] = useState('');
  const [formData, setFormData] = useState({});
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isAgreed, setIsAgreed] = useState(false); // State for checkbox
  const [isDefiTermsVisible, setIsDefiTermsPopupVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecificTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecificType(e.target.value);
  };

  const handlePropertyActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the property action state (if needed)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic here
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...Array.from(e.target.files)]);
    }
  };

  const handleownershipProofUpload = () => {
    // Handle proof of ownership file upload
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };
  const handleDefiTermsButtonClick = () => {
    setIsDefiTermsPopupVisible(true);
  };

  const handleCloseDefiTermsPopup = () => {
    setIsDefiTermsPopupVisible(false);
  };

  return (
    <div className="property-form4">
      <h2>Let’s Get Your Asset On-Chain...</h2>
      <form onSubmit={handleSubmit}>
        {/* Proof of ownership upload */}
        <div className="form-group">
          <label htmlFor="ownershipProof">Proof of ownership:</label>
          <input
            type="file"
            id="ownershipProof"
            name="ownershipProof"
            accept="image/*"
            onChange={handleownershipProofUpload}
            required
          />
        </div>

        {/* Upload proof of Lien */}
        <div className="form-group">
          <label htmlFor="lienProof">Upload proof of Lien:</label>
          <input
            type="file"
            id="lienProof"
            name="lienProof"
            accept="image/*"
            onChange={handleownershipProofUpload}
            required
          />
        </div>

        {/* Upload Recent Valuation */}
        <div className="form-group">
          <label htmlFor="valuationProof">Upload Recent Valuation:</label>
          <input
            type="file"
            id="valuationProof"
            name="valuationProof"
            accept="image/*"
            onChange={handleownershipProofUpload}
            required
          />
        </div>

        {/* Checkbox for agreement */}

        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              required // You can make it required if needed
            />
            
            I am ready to abide to the terms and conditions
            <button type="submit">Read Terms and conditions**
        <p onClick={handleDefiTermsButtonClick}></p>
        </button>
          </label>
        </div>

        <button type="submit">Upload</button>
      </form>\
      
    </div>
  );
};

export default PropertyForm4;
