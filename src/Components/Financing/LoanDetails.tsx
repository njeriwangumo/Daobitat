import React ,{useState, useCallback, useEffect} from 'react';
import { CSSProperties } from 'react';
import { useUser } from '../../contexts/UserContext';
import { collection, query, where, getDocs,  addDoc  } from 'firebase/firestore';
import { firestore, storage } from '../../firebaseConfig';
import PropertyFormContainer from '../Dashboards/AddProperty/PropertyFormContainer';
import '../../Components/Dashboards/AddProperty/Properties.css';

const customStyles: CSSProperties = {
  ['--select-button-svg' as string]: "url('data:image/svg+xml...')",
  fontFamily: '"Public Sans", "Noto Sans", sans-serif',
};

const LoanDetails: React.FC = () => {

  const { user } = useUser();
  const [properties, setProperties] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');

  const fetchProperties = useCallback(async () => {
    try {
      const userUid = user.uid;
      const propertiesRef = collection(firestore, 'users', userUid, 'properties');
      const propertiesSnapshot = await getDocs(propertiesRef);
      const propertiesList = propertiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertiesList);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, [user.uid]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const getPropertyDisplayName = (property: any) => {
    const parts = [];
    if (property.name) parts.push(property.name);
    if (property.location) parts.push(property.location);
    if (property.unitNo) parts.push(`Unit ${property.unitNo}`);
    return parts.join(' - ') || 'Unnamed Property';
  };

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedProperty(value);
    if (value === 'add_new') {
      setShowForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchProperties();
    setSelectedProperty('');
  };

  const handleSubmit = async () => {
    try {
      const userUid = user.uid;
      const loanRequestRef = collection(firestore, 'financing', 'Requested loans', userUid);
      await addDoc(loanRequestRef, {
        propertyId: selectedProperty,
        loanAmount,
        interestRate,
        repaymentPeriod,
        timestamp: new Date(),
        status: 'pending'
      });
      alert('Loan request submitted successfully!');
      // Reset form after successful submission
      setSelectedProperty('');
      setLoanAmount('');
      setInterestRate('');
      setRepaymentPeriod('');
    } catch (error) {
      console.error('Error submitting loan request:', error);
      alert('Failed to submit loan request. Please try again.');
    }
  };

  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
          
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Loan details</h2>
          
          {/* Loan amount input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          
          {/* Interest rate input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Interest rate"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          
          {/* Repayment period input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Repayment period"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Collateral value dropdown */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
            <select
                value={selectedProperty}
                onChange={handlePropertyChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#533c47] bg-[#261c21] focus:border-[#533c47] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#b89dab] p-[15px] text-base font-normal leading-normal"
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {getPropertyDisplayName(property)}
                  </option>
                ))}
                <option value="add_new" className="text-celadon">Property not on list</option>
              </select>
            </label>
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button className="bg-[#533c47] text-white rounded-xl px-6 py-3 font-medium text-base hover:bg-[#3b2934] focus:outline-none focus:ring-2 focus:ring-[#b89dab]">
              Submit
            </button>
          </div>

        </div>

        {showForm && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={handleCloseForm}>
              &times;
            </button>
            <PropertyFormContainer handleCloseForm={handleCloseForm} />
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default LoanDetails;
