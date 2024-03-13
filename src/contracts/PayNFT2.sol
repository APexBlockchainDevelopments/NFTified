// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;


contract CoolNFT3 {
    address public owner;
    string message;

    constructor(string memory name) public payable{
        message = name;
        owner = msg.sender;
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    function getNumber() public pure returns(uint){
        return 25*25;
    }

    uint public num1 = 8;

    function getLuckyNumber() public view returns(uint){
        return num1 * num1;
    }

    function addNumber() public returns(uint){
        num1++;
        return num1;
    }

     function getMessage() public view returns(string memory){
        return message;
    }

    function returnBalance() public{
        uint balance = address(this).balance;
        //(bool success, ) = msg.sender.call.value(balance)("");
        (bool success, ) = msg.sender.call{value: balance} (" ");
        require(success, "Transfer failed.");
    }
}