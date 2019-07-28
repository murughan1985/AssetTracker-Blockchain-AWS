pragma solidity >=0.4.25 <0.6.0;

contract Shipper
{
    string public name;
    address public shipper_address;
    string public location;
    
    constructor (string memory shipperName, address shipperAddress, 
                  string memory shipperLocation) public {
        name = shipperName;
        shipper_address = shipperAddress;
        location = shipperLocation;        
    }
}
