pragma solidity ^0.4.11;

contract ValueStore {
  string value;

  function write(string _value) public {
    value = _value;
  }

  function read() public view returns (string) {
    return value;
  }
}
