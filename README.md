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
