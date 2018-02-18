pragma solidity ^0.4.11;

contract MedicalRecord {
    // It's all in the details
    struct Data { 
        bool std;
        bool birthCtr;
        uint submitDate;
        uint expDate;
    }

    address user;
    address[] providers;
    Data public data;

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

    function updateData(bool std, bool birthCtr, uint submitDate, uint expDate)
        public
        providerOnly
        {
            data.std = std;
            data.birthCtr = birthCtr;
            data.submitDate = submitDate;
            data.expDate = expDate;
        }
}