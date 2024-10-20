import React, { useState } from 'react';
import PriceRangeCheckboxes from './PriceRange';
import { FaSearch } from 'react-icons/fa';

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
  

}

interface PriceRange {
  label: string;
  min: number;
  max: number | null;
}

const dummyNFTs: NFT[] = [
  {
    id: '1',
    metadata: {
      name: 'Property in Syokimau',
      description: '3 Acre undeveloped land on LR345',
      image: 'https://placekitten.com/200/200',
      },
    priceEth: '0.05',
    datePosted: '2024-10-15',

  },
  {
    id: '2',
    metadata: {
      name: 'Property In Lagos',
      description: 'a 3bedroom Apartment',
      image: 'https://placedog.net/200/200',
    },
    priceEth: '0.07',
    datePosted: '2024-10-14',
  },
  {
    id: '3',
    metadata: {
      name: 'Pharmaceuticals Receivable assets',
      description: 'Assets under Lien for the period 2024',
      image: '/api/placeholder/200/200',
    },
    priceEth: '0.03',
    datePosted: '2024-10-16',
  
  },
  {
    id: '4',
    metadata: {
      name: 'Cute Bunny #2',
      description: 'A cute bunny NFT',
      image: '/api/placeholder/200/200',
    },
    priceEth: '0.03',
    datePosted: '2024-10-16',
  
  },
];

const NFTMarketplace: React.FC = () => {
  const [nfts] = useState<NFT[]>(dummyNFTs);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);

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
            <p className="text-sm"><strong>Price:</strong> {nft.priceEth} ETH</p>
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