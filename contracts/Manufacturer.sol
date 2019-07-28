pragma solidity >=0.4.25 <0.6.0;


contract Manufacturer
{
    string public name;
    address public manufacturer_address;
    string public location;
    
    constructor ( string memory manufacturerName, address manufacturerAddress, 
                string memory manufacturerLocation) public {
        name = manufacturerName;
        manufacturer_address = manufacturerAddress;
        location = manufacturerLocation;
    }
}