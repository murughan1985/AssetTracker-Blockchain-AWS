pragma solidity >=0.4.25 <0.6.0;

contract Dealer
{
    string public name;
    address public dealer_address;
    string public location;
    
    constructor (string memory dealerName, address dealerAddress, 
    string memory dealerLocation) public
    {
        name = dealerName;
        dealer_address = dealerAddress;
        location = dealerLocation;
    }
}