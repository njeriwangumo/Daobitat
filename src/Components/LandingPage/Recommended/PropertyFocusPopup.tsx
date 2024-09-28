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
  console.log(user);
  if (!property) return null;
  

  const handleMessageClick = async () => {
    const recipientId = property.userId;
    const senderId = user.uid;
    const propertyId = property.idc;
    /*

    Step 1: Check if a thread already exists between the two participants
    const threadsRef = collection(firestore, 'threads');
    const q = query(threadsRef, where('participants', 'array-contains', senderId));
    const querySnapshot = await getDocs(q);

    let existingThreadId = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(recipientId) && data.propertyId === propertyId) {
        existingThreadId = doc.id;
      }
    });

    // Step 2: If thread exists, set the threadId, otherwise start a new thread
    if (existingThreadId) {
      setThreadId(existingThreadId);
    } else {
      const newThreadRef = await addDoc(threadsRef, {
        participants: [senderId, recipientId],
        propertyId: propertyId,
        lastMessage: '',
        lastUpdated: serverTimestamp(),
      });
      setThreadId(newThreadRef.id);
    }

    */

    setShowMessagePopup(true); // Show the MessagePopup
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
        <button onClick={onClose} className="close-button">X</button>
        <h2>{property.propertyName}</h2>
        <img src={property.images[0]} alt={property.propertyName} />
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> {property.price}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Space:</strong> {property.space} sqft</p>
        <p><strong>Property Type:</strong> {property.propertyType}</p>
        <p><strong>Furnished:</strong> {property.furnished}</p>
        <p><strong>Garden:</strong> {property.garden ? 'Yes' : 'No'}</p>
        <p><strong>Gym:</strong> {property.gym ? 'Yes' : 'No'}</p>
        <p><strong>Pool:</strong> {property.pool ? 'Yes' : 'No'}</p>
        <p><strong>Parking:</strong> {property.parking ? 'Yes' : 'No'}</p>
        <p><strong>Security:</strong> {property.security}</p>
        <p><strong>Additional Comments:</strong> {property.additionalComments}</p>
        <button onClick={handleMessageClick}>Message</button>

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
            <p>{tokenAmount} Tokens</p>
            <p> - Cost: ${totalCost.toFixed(2)}</p>
            <button onClick={handleBuyShareClick} className="buy-share-button">
              Buy Share
            </button>
          </div>
        )}

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
      

      

      
    </div>
  );
}

export default PropertyFocusPopup;
