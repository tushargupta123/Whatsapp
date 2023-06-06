//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Whatsapp {
    struct Message {
        address to;
        string _msg;
        uint timestamp;
    }

    mapping(address => mapping(uint256 => Message)) public message;
    mapping(address => mapping(address => uint256)) public count;

    function send(address to, string memory _msg) external {
        message[msg.sender][count[msg.sender][to]] = Message(to, _msg,block.timestamp);
        count[msg.sender][to]++;
    }

    function allMessages(address from ,uint msgNo) public view returns (Message memory) {
        return message[from][msgNo];
    }

    function totalMessageTo(address from ,address to) public view returns(uint){
        return count[from][to];
    }
}
