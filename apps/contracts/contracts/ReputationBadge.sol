// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract ReputationBadge is ERC1155 , Ownable{
using Strings for uint256;
uint256 private nextBadgeTypeId =0;

struct BadgeType{
    uint256 id;
    string name;
    string description;
    string imageURI;

}

mapping(uint256 =>BadgeType) private badgeTypes;
event BadgeTypeCreated(uint256 indexed badgeTypeId ,string name);
event BadgeMinted(uint256 indexed badgeTypeId , address indexed to );

constructor() ERC1155("https://taskchain.example/api/badge/")Ownable(msg.sender) {

}

function createBadgeType(string memory name ,string memory description ,string memory imageURI)public onlyOwner returns(uint256){

uint256 badgeTypeId= nextBadgeTypeId;
nextBadgeTypeId++;

BadgeType memory newBadgeType =BadgeType({
    id:badgeTypeId,
    name:name,
    description:description,
    imageURI:imageURI
});
badgeTypes[badgeTypeId]= newBadgeType;
emit BadgeTypeCreated(badgeTypeId,name);
return badgeTypeId;
}

function mintBadge(address to ,uint256 badgeTypeId) public onlyOwner {
    require(badgeTypeId < nextBadgeTypeId,"Badge type doesn't exist");
    _mint(to,badgeTypeId,1,"");
    emit BadgeMinted(badgeTypeId,to);
}

function getBadgeType(uint256 badgeTypeId) public view returns(BadgeType memory){
    require(badgeTypeId < nextBadgeTypeId, "Badge type does not exist");
    return badgeTypes[badgeTypeId];
}

function uri(uint256 badgeTypeId) public view override returns (string memory) {
        require(badgeTypeId < nextBadgeTypeId, "Badge type does not exist");
        return string(abi.encodePacked(super.uri(badgeTypeId), badgeTypeId.toString()));
    }

}
