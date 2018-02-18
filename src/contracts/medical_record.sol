pragma solidity ^0.4.11;

library MedicalRecordLib {
    struct Data { mapping(string => string) details; }

    function update(Data storage self, string property, string value)
        public
        returns (bool)
        {
            if (contains(self, property)) {
                self.details[property] = value;
                return true;
            }
            else
                return false;
        }
    function insert(Data storage self, string property, string value)
        public
        returns (bool)
        {
            if (contains(self, property))
                return false; // already there
            self.details[property] = value;
            return true;
        }

    function remove(Data storage self, string property)
        public
        returns (bool)
        {
            if (!contains(self, property))
                return false; // not there
            delete self.details[property];
            return true;
        }

    function get(Data storage self, string property)
        public
        returns (string)
        {
            if (contains(self, property)) {
                return self.details[property];
            }
            return "";
        }

    function contains(Data storage self, string property)
        public
        view
        returns (bool)
        {
            // TODO why doesn't in know this is a string?
            return bytes(self.details[property]).length > 0;
        }
}

contract MedicalRecord {
    using MedicalRecordLib for MedicalRecordLib.Data;

    address user;
    address[] providers;
    MedicalRecordLib.Data data;

    function MedicalRecord(address usr, address[] provs)
        public
        {
            user = usr;
            providers = provs;
        }

    function isUser() 
        private
        returns(bool)
        {
            return msg.sender == user;
        }

    function isProvider()
        private
        returns(bool)
        {
            bool isProv = false;
            for (uint8 i = 0; i < providers.length; i++) {
                if (providers[i] == msg.sender) {
                    isProv = true;
                    break;
                }
            }
            return isProv;
        }
    
    modifier userOrProvider() {
        bool isUsrOrProv = isUser() || isProvider();

        require(isUsrOrProv);
        _;
    }

    modifier providerOnly() {
        bool isProv = isProvider();

        require(isProv);
        _;
    }

    // Only a provider can see raw data
    // TODO allow THE user to see raw data vs any user
    function getData(string property)
        public
        providerOnly
        returns (string)
        {
            return MedicalRecordLib.get(data, property);
        }

    function insertData(string property, string value)
        public
        providerOnly
        returns (bool)
        {
            return MedicalRecordLib.insert(data, property, value);
        }

    function updateData(string property, string value)
        public
        providerOnly
        returns (bool)
        {
            return MedicalRecordLib.update(data, property, value);
        }

    function removeData(string property)
        public
        providerOnly
        returns (bool)
        {
            return MedicalRecordLib.remove(data, property);
        }
}