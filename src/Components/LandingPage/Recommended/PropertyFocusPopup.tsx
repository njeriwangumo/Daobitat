import React, { useState } from 'react';
import './PropertyFocusPopup.css';
import { useUser } from '../../../contexts/UserContext';
import { firestore } from '../../../firebaseConfig';
import { collection, query, where, getDocs, addDoc, serverTimestamp} from 'firebase/firestore';
import MessagePopup from './MessagePopup';
import { createPortal } from 'react-dom';

interface PropertyFocusPopupProps {
  property: any; // Ideally, type this with the Property interface
  onClose: () => void;
}

const PropertyFocusPopup: React.FC<PropertyFocusPopupProps> = ({ property, onClose }) => {
  const { user } = useUser();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  if (!property) return null;

  const handleMessageClick = async () => {
    // ... (rest of the handleMessageClick function remains unchanged)
    setShowMessagePopup(true);
  };

  const handleCloseMessagePopup = () => {
    setShowMessagePopup(false);
  };

  const handleBuyShareClick = () => {
    alert('Share bought successfully');
    onClose();
  }

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(Number(e.target.value));
  };

  const pricePerToken = property.price / 10;
  const totalCost = pricePerToken * tokenAmount;

  return (
    <div className="property-details-popup">
      <div className="popup-content">
        <button onClick={onClose} className="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="property-title">{property.propertyName}</h2>
        <div className="property-image-container">
          <img src={property.images[0]} alt={property.propertyName} className="property-image" />
        </div>
        <div className="property-details">
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{property.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value">${property.price.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Bedrooms:</span>
            <span className="detail-value">{property.bedrooms}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Bathrooms:</span>
            <span className="detail-value">{property.bathrooms}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Space:</span>
            <span className="detail-value">{property.space} sqft</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Property Type:</span>
            <span className="detail-value">{property.propertyType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Furnished:</span>
            <span className="detail-value">{property.furnished}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Amenities:</span>
            <span className="detail-value">
              {property.garden ? 'Garden, ' : ''}
              {property.gym ? 'Gym, ' : ''}
              {property.pool ? 'Pool, ' : ''}
              {property.parking ? 'Parking' : ''}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Security:</span>
            <span className="detail-value">{property.security}</span>
          </div>
        </div>
        <p className="additional-comments"><strong>Additional Comments:</strong> {property.additionalComments}</p>
        <div className="action-buttons">
          <button onClick={handleMessageClick} className="message-button">Message</button>
          {property.daoenabled && (
            <div className="dao-actions">
              <label htmlFor="token-slider">Select Amount of Tokens to Buy:</label>
              <input 
                type="range" 
                id="token-slider" 
                min="1" 
                max="3" 
                value={tokenAmount} 
                onChange={handleTokenAmountChange} 
                className="token-slider"
              />
              <p>{tokenAmount} Tokens - Cost: ${totalCost.toFixed(2)}</p>
              <button onClick={handleBuyShareClick} className="buy-share-button">
                Buy Share
              </button>
            </div>
          )}
        </div>
      </div>
      {showMessagePopup && createPortal(
        <MessagePopup
          threadId={threadId}
          senderId={user.uid}
          recipientId={property.userId}
          propertyId={property.idc}
          propertyName={property.propertyName}
          propertyType={property.propertyType} 
          propertyLocation={property.location} 
          onClose={handleCloseMessagePopup}
        />,
        document.body
      )}  
    </div>
  );
}

export default PropertyFocusPopup;