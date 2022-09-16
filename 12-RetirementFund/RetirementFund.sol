pragma solidity ^0.7.4;

contract solveretirementfund{
    constructor() payable public{
        require(msg.value >= 1 gwei);

    }
    function kill(address addr) public{
        selfdestruct(payable(addr));
    }
    function getBalance() view public returns(uint256){
        return address(this).balance;
    }
}

