// src/components/PropertyFormContainer.tsx
import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import PropertyForm2 from './PropertyForm2';
import PropertyForm3 from './PropertyForm3';

interface PropertyFormContainerProps {
  handleCloseForm: () => void;
}


const PropertyFormContainer: React.FC<PropertyFormContainerProps> = ({ handleCloseForm }) => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [propertyAction, setPropertyAction] = useState(''); 
  const [documentId, setDocumentId] = useState<string | null>(null);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const [location, setLocation] = useState(''); 

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };
  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type);
  };

 

  return (
    <div>
      {step === 1 && <PropertyForm nextStep={nextStep} 
                      onLocationChange={handleLocationChange} 
                      onPropertyTypeChange={handlePropertyTypeChange}
                      setDocumentId={setDocumentId}/>}
      {step === 2 && <PropertyForm2 nextStep={nextStep} 
                      prevStep={prevStep}
                      location={location} />}
      {step === 3 && <PropertyForm3 prevStep={prevStep}
                     propertyType={propertyType} 
                     propertyAction={propertyAction}
                     documentId={documentId}
                     handleCloseForm={handleCloseForm}/>}
    </div>
  );
};

export default PropertyFormContainer;
