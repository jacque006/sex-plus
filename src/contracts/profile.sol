pragma solidity ^0.4.11;

import "./medical_record.sol";

library UserLib {
    struct User {
        address addr;
        string name;
        int age;
        string gender;
        MedicalRecordLib.Data records;

        // Possibly store a list of addresses with access to user records?
        // address[] whitelist;
    }


}

contract UserManager {
    using MedicalRecordLib for MedicalRecordLib.Data;
    using UserLib for UserLib.User;

    UserLib.User user;

    function createProfile(string name, int age, string gender)
        public 
        {
            user.addr = msg.sender;
            user.name = name;
            user.age = age;
            user.gender = gender;

            // Since age and gender are "medical records" store them as such
            user.records.update("age", bytes32ToString(bytes32(user.age)));
            user.records.update("gender", user.gender);
    }

    function changeName(string name) 
        public 
        {
            if (msg.sender == address(user.addr))
                user.name = name;
    }

    // Language doens't have toString()
    function bytes32ToString (bytes32 data)
        public
        returns (string) 
        {
            bytes memory bytesString = new bytes(32);
            for (uint j=0; j<32; j++) {
                byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[j] = char;
                }
            }
            return string(bytesString);
    }
}