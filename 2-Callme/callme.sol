// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ICallMeChallenge{
     function callme() external;
}

contract callme{
    ICallMeChallenge icall;
    constructor(address addr) public {
        icall = ICallMeChallenge(addr);
        icall.callme();
    }

}