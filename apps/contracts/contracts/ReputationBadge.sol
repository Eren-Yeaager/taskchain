// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationBadge is ERC1155 , Ownable{

uint256 private nextBadgeTypeId =0;
struct BadgeType{
    uint256 id;
    string name;
    string description;
    string imageURI;

}

mapping(uint256 =>BadgeType) private badgeTypes;

constructor() ERC1155("https://taskchain.example/api/badge/"){

}

function createBadgeType(string memory name ,string memory description ,string memory imageURI)public onlyOwner returns(uint256){

uint256 badgeTypeId= nextBadgeTypeId;
nextBadgeTypeId++;
}
}