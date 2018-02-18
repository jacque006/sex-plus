pragma solidity ^0.4.11;

import "./medical_record.sol";

contract UserContract {
    struct User {
        // State Variables (Stored)
        address addr;
        string name;
        int age;
        string gender;


        // List of certified medical providers
        address[] whitelist;
        MedicalRecord records;
    }

    User public user;

    // Function modifer for user CRUD operations 
    modifier onlyUser() {
        require(msg.sender == user.addr);
        _;
    }

    function UserContract(string name, int age, string gender)
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
    
    function getRecordsContract()
        public
        returns(MedicalRecord)
        {
            return user.records;
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