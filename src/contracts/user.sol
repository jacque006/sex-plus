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
        address provider;
        MedicalRecord records;
    }

    User public user;

    // Function modifer for user CRUD operations 
    modifier onlyUser() {
        require(msg.sender == user.addr);
        _;
    }

    function UserContract(string name, int age, string gender, address provider)
        public
        {
            user.addr = msg.sender;
            user.name = name;
            user.age = age;
            user.gender = gender;
            user.provider = provider;
            user.records = new MedicalRecord(this, provider);
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
            return provider == user.provider;
        }
}