// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Import Ownable contract from OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyToken is Ownable {
    uint256 public tokenPrice; // Price per token in wei
    mapping(address => uint256) public sharesOwned;

    event SharesBought(address indexed buyer, uint256 amount, uint256 totalCost);

    constructor(uint256 _tokenPrice) {
        tokenPrice = _tokenPrice;
    }

    function buyShares(uint256 numTokens) public payable {
        require(msg.value == numTokens * tokenPrice, "Incorrect Ether amount sent");
        sharesOwned[msg.sender] += numTokens;
        emit SharesBought(msg.sender, numTokens, msg.value);
    }

    // Use onlyOwner modifier from OpenZeppelin
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
