pragma solidity ^0.4.11;

import "./medical_record.sol";
import "./user.sol";

contract Provider {
    modifier isWhiteListed(UserContract usrCtrct) {
        require(usrCtrct.isWhiteListed(msg.sender));
        _;
    }

    function getRecord(UserContract usrCtrct, string property)
        public
        isWhiteListed(usrCtrct)
        {
            usrCtrct.getRecordsContract().get(property);
        }

    function insertRecord(UserContract usrCtrct, string property, string value)
        public
        isWhiteListed(usrCtrct)
        {
            usrCtrct.getRecordsContract().insert(property, value);
        }

    function updateRecord(UserContract usrCtrct, string property, string value)
        public
        isWhiteListed(usrCtrct)
        {
            usrCtrct.getRecordsContract().update(property, value);
        }

    function removeRecord(UserContract usrCtrct, string property)
        public
        isWhiteListed(usrCtrct)
        {
            usrCtrct.getRecordsContract().remove(property);
        }
}