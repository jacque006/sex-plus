pragma solidity ^0.4.11;

import "./medical_record.sol";

library UserLib {



}

contract UserManager {
    struct User {
        // State Variables (Stored)
        address addr;
        string name;
        int age;
        string gender;
        MedicalRecordLib.Data records;

        // List of certified medical providers
        address[] whitelist;
    }

    using MedicalRecordLib for MedicalRecordLib.Data;

    User public user;

    // Function modifer for user CRUD operations 
    modifier onlyUser() {
        require(msg.sender == user.addr);
        _;
    }

    function UserManager(string name, int age, string gender)
        public
        {
            user.addr = msg.sender;
            user.name = name;
            user.age = age;
            user.gender = gender;

            // Since age and gender are "medical records" store them as such
            user.records.insert("age", bytes32ToString(bytes32(user.age)));
            user.records.insert("gender", user.gender);
        }

    function changeName(string name) 
        public
        onlyUser
        {
            user.name = name;
        }

    function isWhiteListed(address provider)
        public
        returns(bool)
        {
            bool isWL = false;
             for (uint8 i = 0; i < user.whitelist.length; i++) {
                 if (provider == user.whitelist[i]) {
                     isWL = true;
                     break;
                 }
             }
            return isWL;
        }



    // Language doesn't have toString()
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