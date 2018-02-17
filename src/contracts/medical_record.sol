pragma solidity ^0.4.11;

library MedicalRecord {
    struct Data { mapping(uint => string) details; }

    function update(Data storage self, uint property, string value)
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
    function insert(Data storage self, uint property, string value)
        public
        returns (bool)
        {
            if (contains(self, property))
                return false; // already there
            self.details[property] = value;
            return true;
        }

    function remove(Data storage self, uint property, string value)
        public
        returns (bool)
        {
            if (!contains(self, property))
                return false; // not there
            self.details[property] = value;
            return true;
        }

    function contains(Data storage self, uint property)
        public
        view
        returns (bool)
        {
            // TODO why doesn't in know this is a string?
            return bytes(self.details[property]).length > 0;
        }
}