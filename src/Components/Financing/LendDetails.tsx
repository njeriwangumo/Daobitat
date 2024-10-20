import React, { useState ,useEffect} from 'react';
import PriceRangeCheckboxes from './PriceRange';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs ,getDoc, doc,DocumentData} from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; 

interface NFTMetadata {
  name: string;
  description: string;
  image: string;

}

interface PropertyDetails {
  propertyName: string;
  location: string;
  price: string;
  images: string[];
  bedrooms: string;
  bathrooms: string;
  space: string;
  // Add other property details as needed
}

interface NFT {
  id: string;
  metadata: NFTMetadata;
  priceEth: string;
  datePosted: string;
  borrowerAddress: string;
  borrowerId: string;
  interestRate: string;
  landPrice: number;
  loanAmount: number;
  loanPeriod: string;
  propertyId: string;
  status: string;
  tokenId: string;
  propertyDetails: PropertyDetails;
}


interface PriceRange {
  label: string;
  min: number;
  max: number | null;
}



const NFTMarketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTsWithDetails = async () => {
      try {
        console.log("Fetching NFTs...");
        const marketplaceRef = collection(firestore, 'marketplace');
        const snapshot = await getDocs(marketplaceRef);
        console.log("Snapshot size:", snapshot.size);
        
        if (snapshot.empty) {
          console.log("No documents found in the marketplace collection");
          setError("No listings available at the moment.");
          return;
        }

        const fetchedNFTs: NFT[] = await Promise.all(snapshot.docs.map(async (document) => {
          const data = document.data();
          console.log("Marketplace document data:", data);
          
          const loanAmount = typeof data.loanAmount === 'number' ? data.loanAmount : 0;
          
          // Fetch property details from users collection
          let propertyDetails: PropertyDetails = {
            propertyName: '',
            location: '',
            price: '',
            images: [],
            bedrooms: '',
            bathrooms: '',
            space: ''
          };
          try {
            const userPropertyRef = doc(firestore, 'users', data.borrowerId, 'properties', data.propertyId);
            const propertyDoc = await getDoc(userPropertyRef);
            if (propertyDoc.exists()) {
              const propertyData = propertyDoc.data() as DocumentData;
              propertyDetails = {
                propertyName: propertyData.propertyName || '',
                location: propertyData.location || '',
                price: propertyData.price || '',
                images: propertyData.images || [],
                bedrooms: propertyData.bedrooms || '',
                bathrooms: propertyData.bathrooms || '',
                space: propertyData.space || ''
              };
              console.log("Property details:", propertyDetails);
            } else {
              console.log("No property details found for:", data.propertyId);
            }
          } catch (error) {
            console.error("Error fetching property details:", error);
          }

          return {
            id: document.id,
            metadata: {
              name: propertyDetails.propertyName || `Property ${data.propertyId || 'Unknown'}`,
              description: `${propertyDetails.bedrooms || ''} bed, ${propertyDetails.bathrooms || ''} bath, ${propertyDetails.space || ''} sqft`,
              image: propertyDetails.images && propertyDetails.images.length > 0 ? propertyDetails.images[0] : '/api/placeholder/200/200',
            },
            priceEth: loanAmount.toString(),
            datePosted: data.createdAt?.toDate().toISOString().split('T')[0] || 'Unknown Date',
            borrowerAddress: data.borrowerAddress || 'Unknown',
            borrowerId: data.borrowerId || 'Unknown',            
            interestRate: data.interestRate || 'Unknown',
            landPrice: typeof data.landPrice === 'number' ? data.landPrice : 0,
            loanAmount: loanAmount,
            loanPeriod: data.loanPeriod || 'Unknown',
            propertyId: data.propertyId || 'Unknown',
            status: data.status || 'Unknown',
            tokenId: data.tokenId || 'Unknown',
            propertyDetails: propertyDetails,
          };
        }));

        console.log("Fetched NFTs with details:", fetchedNFTs);
        setNfts(fetchedNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("Failed to fetch listings. Please try again later.");
      }
    };

    fetchNFTsWithDetails();
  }, []);



  const handleSearch = (): void => {
    alert(`Searching for:
    Name: ${name}
    Location: ${location}
    Price Ranges: ${selectedPriceRanges.map(range => range.label).join(', ')}`);
  };


  const handleView = (id: string): void => {
    alert(`Viewing NFT with ID: ${id}`);
  };

  const handleInvest = (id: string): void => {
    alert(`Viewing NFT with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-4xl font-bold mb-4">Venture Vineyard</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Piece together a vibrant tapestry of projects, where every investment adds color to the big picture</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 flex-grow text-black"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
            className="border p-2 flex-grow text-black"
          />
          
          <PriceRangeCheckboxes 
          onChange={setSelectedPriceRanges} 
          />
           <button
            onClick={handleSearch}
            className="bg-[#533c47] text-white w-10 h-10 rounded hover:bg-[#b7e3cc] transition-colors duration-300 ease-in-out flex items-center justify-center flex-shrink-0"
          >
            <FaSearch size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {nfts.map((nft) => (
          <div key={nft.id} className="border p-4 rounded shadow-lg">
            <img src={nft.metadata.image} alt={nft.metadata.name} className="mb-2 w-full h-48 object-cover" />
            <h2 className="font-bold">{nft.metadata.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{nft.metadata.description}</p>
            <p className="text-sm"><strong>Location:</strong> {nft.propertyDetails.location}</p>
            <p className="text-sm"><strong>Property Value:</strong> ${nft.propertyDetails.price}</p>
            <p className="text-sm"><strong>Loan Amount:</strong> {nft.loanAmount} ETH</p>
            <p className="text-sm"><strong>Interest Rate:</strong> {nft.interestRate}</p>
            <p className="text-sm"><strong>Loan Period:</strong> {nft.loanPeriod}</p>
            <p className="text-sm"><strong>Posted:</strong> {nft.datePosted}</p>
            <div className="flex space-x-2 mt-2">
            <button 
              onClick={() => handleView(nft.id)}
              className="mt-2 bg-[#533c47] text-white px-4 py-2 rounded w-full hover:bg-[#b7e3cc] transition-colors duration-300 ease-in-out"
            >
              View
            </button>
            <button 
              onClick={() => handleInvest(nft.id)}
              className="mt-2 bg-[#533c47] text-white px-4 py-2 rounded w-full hover:bg-[#b7e3cc] transition-colors duration-300 ease-in-out"
            >
              Invest
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;