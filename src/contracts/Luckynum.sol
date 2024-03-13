// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;

contract LuckyNum{

    string message;

    constructor(string memory name) public payable{
        message = name;
    }

    function getNumber() public pure returns(uint){
        return 25*25;
    }

    uint public num1 = 8;

    function getLuckyNumber() public view returns(uint){
        return num1 * num1;
    }


    function getMessage() public view returns(string memory){
        return message;
    }

    function addNumber() public returns(uint){
        num1++;
        return num1;
    }


}