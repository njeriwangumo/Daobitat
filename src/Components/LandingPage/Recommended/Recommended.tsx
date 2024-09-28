import React, { useEffect, useState } from 'react';
import PropertyCard from '../../Dashboards/AddProperty/PropertyCard';
import { collection, getDocs, addDoc, doc, serverTimestamp  } from "firebase/firestore";
import { firestore } from '../../../firebaseConfig';
import PropertyDetailsPopup from './PropertyFocusPopup';
import './Recommended.css';

// Define the property interface
interface Property {
  docId: string;
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  space: string;
  cryptoaccepted: boolean;
  daoenabled: false;
  // Add other fields as necessary
}

const Recommendations = () => {
  const [topproperties, setTopProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = collection(firestore, 'topproperties');
        const querySnapshot = await getDocs(q);

        // Extract document ID and spread document data into the properties array
        const propertiesArray: Property[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Property, 'docId'>; // Exclude docId from the type

          return {
            docId: doc.id, // Use Firestore document ID
            ...data // Spread the rest of the document data
          };
        });

        console.log('Properties Array: ', propertiesArray);
        setTopProperties(propertiesArray);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      }
    };

    fetchProperties();
  }, []);
  const handleCardClick = async (property: Property) => {
    console.log('Card clicked:', property);
    setSelectedProperty(property);

  
      const propertyId = property.docId; 
      console.log('Prop is' ,propertyId)

      if (!propertyId) {
        console.error("Property ID is undefined.");
        return;
      }

    // Add a document to the "interactions" subcollection for the clicked property
    try {
      
      const propertyDocRef = doc(firestore, 'topproperties', propertyId); // Reference to the clicked property
      const interactionsCollectionRef = collection(propertyDocRef, 'interactions'); // Reference to the "interactions" subcollection

      await addDoc(interactionsCollectionRef, {
        type: 'click', // You can change this to other types like "wishlist" or "share"
        time: serverTimestamp() // Firebase server-side timestamp
      });

      console.log('Interaction added to Firestore.');
    } catch (error) {
      console.error('Error adding interaction to Firestore: ', error);
    }
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="personalized-picks">
      <h2 className="text-2xl font-bold mb-4">Personalized Picks</h2>

      <div className="property-cards">
        {topproperties.map(property => (
          <PropertyCard 
            key={property.id}
            {...property}
            onClick={() => handleCardClick(property)} 
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyDetailsPopup 
          property={selectedProperty} 
          onClose={closePopup} 
        />
      )}
      
    </div>
  );
}

export default Recommendations;
