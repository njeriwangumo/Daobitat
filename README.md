# DAO-Bitat

DAO-Bitat unlocks global financing for African SMEs by leveraging real-world assets as verifiable collateral. As a decentralized property listing platform, it revolutionizes real estate investing through blockchain technology by tokenizing properties into digital assets. This enables verifiability, co-ownership, and traceability of assets across borders, bringing transparency and accessibility to the real estate market, benefiting investors and the entire ecosystem.

## Current Status

- **MVP Live**: Our Minimum Viable Product is currently live on the Base testnet.
- **Contract Address**: `0x5BD51c30473CFCc8F5a27874dE5f9D105a8012d8` (deployed on Base)

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
8. **Request for loans**: Allows users to borrow loans and draw from the smart contract.
9. **connect to EOA and smart wallet**: Lenders, borrowers and players in the ecosystem are able to connect to their wallets for any anticipated transactions.
10. **Make loan payments and activate terms &Conditions** Automatically deduct loan payments from wallet once due,and allow users to review the terms and conditions.
      

## Smart Contract: CertificateOfLien

Our `CertificateOfLien` smart contract manages lien certificates for properties as ERC721 (NFT) tokens.

The contract uses OpenZeppelin's Ownable module to give certain permissions (like the ability to transfer defaulted properties) only to the contract owner.
Input Summary:
createLien: Requires landPrice, period, and interestRate.
repayLoan: Requires tokenId and a payment (via msg.value).
calculateRepaymentAmount: Requires tokenId.
transferAfterDefault: Requires tokenId.

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
A borrower creates a lien using createLien(), which mints an NFT and records the loan details.
The borrower can repay the loan through repayLoan(), which calculates the due amount based on interest accrued over time.
If the borrower fails to repay the loan within the given period, the contract owner can take possession of the lien (symbolizing a default) using transferAfterDefault().


1. Loan Request submitted
2. Request approved by DAO-Bitat
3. Smart contract deployed and `createLien` function initiated
4. Collateral and request sent to marketplace
5. Lender selects the loan
6. Loan terms set on smart contract (e.g., interest rate)
7. Monthly payments processed through billings page

In the handleInvest function:

We check if the loan has already been funded by calling getLienDetails and checking the lender address.

We use the invest function from the smart contract to make the investment.
After a successful transaction, we calculate the repayment amount and date based on the loan details.

We update the Firestore document in the 'marketplace' collection with the lender's address, repayment amount, repayment date, and change the status to 'funded'.
The smart contract's invest function is responsible for transferring the funds to the borrower.

A borrower creates a lien using createLien(), which mints an NFT and records the loan details.

The borrower can repay the loan through repayLoan(), which calculates the due amount based on interest accrued over time.

If the borrower fails to repay the loan within the given period, the contract owner can take possession of the lien (symbolizing a default) using transferAfterDefault().

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
