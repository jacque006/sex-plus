pragma solidity ^0.4.11;

contract MedicalRecord {
    // It's all in the details
    struct Data { mapping(string => string) details; }

    address user;
    address[] providers;
    Data private data;

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

    function update(string property, string value)
        public
        providerOnly
        returns (bool)
        {
            if (contains(property)) {
                data.details[property] = value;
                return true;
            } else {
                return false;
            }
        }

    function insert(string property, string value)
        public
        providerOnly
        returns (bool)
        {
            if (contains(property))
                return false; // already there
            data.details[property] = value;
            return true;
        }

    function remove(string property)
        public
        providerOnly
        returns (bool)
        {
            if (!contains(property))
                return false; // not there
            delete data.details[property];
            return true;
        }

    function get(string property)
        public
        returns (string)
        {
            if (contains(property)) {
                return data.details[property];
            }
            return "";
        }

    function contains(string property)
        public
        view
        returns (bool)
        {
            // TODO why doesn't in know this is a string?
            return bytes(data.details[property]).length > 0;
        }
}