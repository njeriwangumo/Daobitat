# DAO-Bitat

DAO-Bitat is a decentralized property listing platform built using **React**, **Firebase**, and **Ethereum**. The platform leverages blockchain technology to tokenize property assets, enabling co-ownership and group decision-making. Integrated with **Google Cloud** for data analysis and **Google Maps** for location services, DAO-Bitat brings transparency and accessibility to real estate investing.

The Minimum Viable Product (MVP) is currently live on the **Base** testnet.Base is a Layer 2 (L2) network secured by Ethereum.

## Features

- **Decentralized Property Listings**: Tokenizes real estate properties on the Ethereum blockchain.
- **User Authentication**: Supports multiple user types, including property listers, agents, and buyers/renters.
- **Search and Filter Functionality**: Efficiently organize properties for easy browsing.
- **User Profiles**: Create and manage user accounts.
- **Favorites**: Save and manage favorite properties.
- **Messaging**: Communicate directly between users.
- **Reviews and Ratings**: Rate and review properties and listers.

## Database Structure

The database is structured to support all key features:

```plaintext
/users
  /userId
    - name: string
    - email: string
    - role: string
    - profilePicture: string
    - contactInfo: map
    - createdAt: timestamp
    /favorites
      /propertyId
        - addedAt: timestamp

/topproperties
  /propertyId
    - listerId: string
    - address: map
    - price: number
    - images: array
    - description: string
    - features: map
    - status: string
    - createdAt: timestamp

/messages
  /conversationId
    - participants: array
    /messages
      /messageId
        - senderId: string
        - text: string
        - timestamp: timestamp
         /interactions
              -time:timestamp
               -type: string (could be click/share/wishlist etc) 

/reviews
  /reviewId
    - reviewerId: string
    - reviewedId: string
    - rating: number
    - comment: string
    - createdAt: timestamp


#Smart contract documentation

This Solidity smart contract, CertificateOfLien, is an ERC721 (NFT) token contract that creates and manages lien certificates on properties (e.g., land). A lien is essentially a legal right or interest that a lender has in a borrower's property until the loan is repaid. Here's a high-level explanation of how it works and what inputs it uses:

Key Components:
Lien Structure: The contract defines a structure Lien, which stores key information about a lien:

landPrice: The price of the land tied to the lien.
owner: The address of the lien holder (borrower).
period: The duration (in seconds) for which the lien is valid.
interestRate: The interest rate applied to the loan (in percentage).
isActive: A flag to indicate whether the lien is still active.
creationTime: The timestamp when the lien was created.
NFT Minting:

The contract extends the ERC721 standard from OpenZeppelin, allowing each lien to be represented as a non-fungible token (NFT) with a unique token ID.
The createLien function mints a new NFT and records the lien details (such as land price, loan period, and interest rate).
Lien Management:

createLien(): This function creates a lien, assigns it to the caller (the borrower), and mints a new NFT representing the lien.

Inputs: landPrice, period, interestRate (all numbers).
Output: A unique token ID for the lien (NFT).
repayLoan(): Allows the borrower to repay the loan and deactivate the lien. The repayment amount is calculated using the land price, the interest rate, and the time since creation.

Input: tokenId (the ID of the lien NFT) and the payment (via msg.value).
Output: No return value; updates the lien to inactive and transfers the repayment to the lien holder.
calculateRepaymentAmount(): Calculates the total repayment amount, including interest, based on the time that has elapsed since the lien was created.

Input: tokenId (the ID of the lien NFT).
Output: The total amount due (including interest).
transferAfterDefault(): If the lien period expires and the loan is unpaid, the contract owner (likely the lender) can transfer ownership of the NFT back to themselves, symbolizing a foreclosure or repossession of the property.

Input: tokenId (the ID of the lien NFT).
Output: No return value; transfers ownership of the lien to the contract owner.
Ownership and Access Control:

The contract uses OpenZeppelin's Ownable module to give certain permissions (like the ability to transfer defaulted properties) only to the contract owner.
Input Summary:
createLien: Requires landPrice, period, and interestRate.
repayLoan: Requires tokenId and a payment (via msg.value).
calculateRepaymentAmount: Requires tokenId.
transferAfterDefault: Requires tokenId.
High-Level Flow:
A borrower creates a lien using createLien(), which mints an NFT and records the loan details.
The borrower can repay the loan through repayLoan(), which calculates the due amount based on interest accrued over time.
If the borrower fails to repay the loan within the given period, the contract owner can take possession of the lien (symbolizing a default) using transferAfterDefault().