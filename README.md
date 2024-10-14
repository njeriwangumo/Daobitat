# DAO-Bitat

DAO-Bitat is a decentralized property listing platform that revolutionizes real estate investing through blockchain technology. By tokenizing property assets, we enable co-ownership, group decision-making, and DAO-based property management, bringing transparency and accessibility to the real estate market.

## Current Status

- **MVP Live**: Our Minimum Viable Product is currently live on the Base testnet.
- **Contract Address**: `0x5942c3c250dDEAAcD69d1aB7cCD81c261cF15204` (deployed on Base)

## Technology Stack

- Frontend: React
- Backend: Firebase
- Blockchain: Ethereum (Base Layer 2)
- Wallet Integration:
  - Base Smart Wallet (powered by Coinbase)
  - MetaMask
- Additional Services:
  - Google Cloud for data analysis
  - Google Maps for location services

## Key Features

1. **Decentralized Property Listings**: Tokenize real estate properties on the Ethereum blockchain.
2. **User Authentication**: Support for multiple user types (property listers, agents, buyers/renters).
3. **Search and Filter**: Efficient organization of property listings.
4. **User Profiles**: Create and manage user accounts.
5. **Favorites**: Save and manage favorite properties.
6. **Messaging**: Direct communication between users.
7. **Reviews and Ratings**: Rate and review properties and listers.

## Smart Contract: CertificateOfLien

Our `CertificateOfLien` smart contract manages lien certificates for properties as ERC721 (NFT) tokens.

### Key Functions:

- `createLien`: Mint a new NFT representing a lien.
- `repayLoan`: Allow borrowers to repay loans and deactivate liens.
- `calculateRepaymentAmount`: Calculate total repayment amount with interest.
- `transferAfterDefault`: Transfer ownership of defaulted properties.

## Base Smart Wallet Integration

DAO-Bitat leverages the Base Smart Wallet for enhanced user experience and security:

Seamless Connection: Users can easily connect their Base Smart Wallet to the platform.
Secure Transactions: All property-related transactions are processed through the secure Base Smart Wallet.
Gas-Optimized: Benefit from Base's Layer 2 solution for faster and cheaper transactions.
User-Friendly: Simplified wallet management for both experienced crypto users and newcomers.

## Loan Process Flow

1. Loan Request submitted
2. Request approved by DAO-Bitat
3. Smart contract deployed and `createLien` function initiated
4. Collateral and request sent to marketplace
5. Lender selects the loan
6. Loan terms set on smart contract (e.g., interest rate)
7. Monthly payments processed through billings page

## Database Structure

Our Firebase database is structured to support all key features:

```
/users
  /userId
    - user details
    /favorites
      - saved properties

/topproperties
  /propertyId
    - property details

/messages
  /conversationId
    - conversation details
    /messages
      - message details

/reviews
  /reviewId
    - review details
```



## Contact

- Tracy Wankio - tracywankio29@gmail.com
- Joyce Njeri - njeriwangumo@gmail.com