pragma solidity ^0.4.11;

import "./medical_record.sol";

contract CreateProfile {
    using MedicalRecord for MedicalRecord.Data;


    address public user;
    MedicalRecord.Data userRecord;


    function CreateProfile() public {
        user = msg.sender;
        userRecord.insert("testKey", "testValue");
    }
}

