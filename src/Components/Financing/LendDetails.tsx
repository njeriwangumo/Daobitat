import React, { useState } from 'react';

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
  baseScore: string;
}

const dummyNFTs: NFT[] = [
  {
    id: '1',
    metadata: {
      name: 'Cool Cat #1',
      description: 'A very cool cat NFT',
      image: 'https://placekitten.com/200/200',
    },
    priceEth: '0.05',
    datePosted: '2024-10-15',
    baseScore: '5',
  },
  {
    id: '2',
    metadata: {
      name: 'Awesome Dog #1',
      description: 'An awesome dog NFT',
      image: 'https://placedog.net/200/200',
    },
    priceEth: '0.07',
    datePosted: '2024-10-14',
    baseScore: '4',
  },
  {
    id: '3',
    metadata: {
      name: 'Cute Bunny #1',
      description: 'A cute bunny NFT',
      image: '/api/placeholder/200/200',
    },
    priceEth: '0.03',
    datePosted: '2024-10-16',
    baseScore: '2',
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
    baseScore: '-1',
  },
];

const NFTMarketplace: React.FC = () => {
  const [nfts] = useState<NFT[]>(dummyNFTs);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleMint = (): void => {
    alert('Minting functionality is not implemented in this dummy version');
  };

  const handleView = (id: string): void => {
    alert(`Viewing NFT with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">NFT Marketplace</h1>
      <button className="bg-[#4a3c41] text-white px-4 py-2 rounded mb-4 hover:bg-[#5a4c51] transition-colors duration-300 ease-in-out">
  Connect Wallet
</button>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {nfts.map((nft) => (
          <div key={nft.id} className="border p-4 rounded shadow-lg">
            <img src={nft.metadata.image} alt={nft.metadata.name} className="mb-2 w-full h-48 object-cover" />
            <h2 className="font-bold">{nft.metadata.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{nft.metadata.description}</p>
            <p className="text-sm"><strong>ID:</strong> {nft.id}</p>
            <p className="text-sm"><strong>Price:</strong> {nft.priceEth} ETH</p>
            <p className="text-sm"><strong>Posted:</strong> {nft.datePosted}</p>
            <button 
              onClick={() => handleView(nft.id)}
              className="mt-2 bg-[#5f133e] text-white px-4 py-2 rounded w-full"
            >
              View
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Search approved Loans</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Price (ETH)"
        value={price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleMint}
        className="bg-[#5f133e] text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default NFTMarketplace;