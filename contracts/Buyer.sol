pragma solidity >=0.4.25 <0.6.0;

contract Buyer
{
    string public name;
    address public buyer_address;
    string public location;
    
    constructor(string memory buyerName, address buyerAddress, 
    string memory buyerLocation) public
    {
        name = buyerName;
        buyer_address = buyerAddress;
        location = buyerLocation;        
    }
}
