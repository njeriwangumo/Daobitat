import React, { useState ,useEffect} from 'react';
import PriceRangeCheckboxes from './PriceRange';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; 

interface NFTMetadata {
  name: string;
  description: string;
  image: string;

}

interface NFT {
  id: string;
  metadata: NFTMetadata;
  priceEth: string;
  datePosted: string;
  borrowerAddress: string;
  interestRate: string;
  landPrice: number;
  loanAmount: number;
  loanPeriod: string;
  propertyId: string;
  status: string;
  tokenId: string;
  

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
    const fetchNFTs = async () => {
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

        const fetchedNFTs: NFT[] = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Document data:", data);
          return {
            id: doc.id,
            metadata: {
              name: `Property ${data.propertyId}`,
              description: `Loan amount: ${data.loanAmount} ETH`,
              image: '/api/placeholder/200/200',
            },
            priceEth: data.loanAmount.toString(),
            datePosted: data.createdAt?.toDate().toISOString().split('T')[0] || 'Unknown Date',
            borrowerAddress: data.borrowerAddress || 'Unknown',
            interestRate: data.interestRate || 'Unknown',
            landPrice: data.landPrice || 0,
            loanAmount: data.loanAmount || 0,
            loanPeriod: data.loanPeriod || 'Unknown',
            propertyId: data.propertyId || 'Unknown',
            status: data.status || 'Unknown',
            tokenId: data.tokenId || 'Unknown',
          };
        });
        console.log("Fetched NFTs:", fetchedNFTs);
        setNfts(fetchedNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("Failed to fetch listings. Please try again later.");
      }
    };

    fetchNFTs();
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
            <p className="text-sm"><strong>ID:</strong> {nft.id}</p>
            <p className="text-sm"><strong>Collateral Price:</strong> {nft.priceEth} ETH</p>
            <p className="text-sm"><strong>Loan Amount:</strong> {nft.priceEth} ETH</p>
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