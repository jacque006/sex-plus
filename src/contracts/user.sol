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

    function UserContract(string name, int age, string gender, address[] providers)
        public
        {
            user.addr = msg.sender;
            user.name = name;
            user.age = age;
            user.gender = gender;
            user.records = new MedicalRecord(this, providers);
        }

    function changeName(string name) 
        public
        onlyUser
        {
            user.name = name;
        }

    function getName()
        public
        returns(string)
        {
            return user.name;
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
}