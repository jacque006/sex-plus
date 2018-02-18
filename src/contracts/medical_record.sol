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

    // chance of user having std
    function stdChance()
        public
        userOrProvider
        returns(int)
        {
            // 0% chance at expireHour
            int expireHour = 48;

            int std = 0;
            if (data.std) {
                return 99;
            } else {
                uint diff = now - data.submitDate;
                uint sec = diff/1000;
                uint min = sec/60;
                uint hr = min/60;

                std = (int(hr) * 99) / expireHour;
            }
            return std;
        }

    // chance of user using birthcontrol
    function birthControlChance()
        public
        userOrProvider
        returns(int)
        {
            // 0% chance at expireHour
            int expireHour = 48;

            int birthCtr = 0;
            if (now < data.expDate && data.birthCtr) {
                return 99;
            } else if (!data.birthCtr) {
                return 0;
            } else {
                uint diff = now - data.expDate;
                uint sec = diff / 1000;
                uint min = sec / 60;
                uint hr = min / 60;

                birthCtr = (int(hr) * 99 / expireHour);
            }
            return birthCtr;
        }
}