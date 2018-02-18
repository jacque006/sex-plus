pragma solidity ^0.4.11;

import "./medical_record.sol";
import "./user.sol";

contract Provider {
    modifier isWhiteListed(UserContract usrCtrct) {
        require(usrCtrct.isWhiteListed(msg.sender));
        _;
    }

    function getRecord(UserContract usrCtrct)
        public
        isWhiteListed(usrCtrct)
        returns(MedicalRecord)
        {
            usrCtrct.getRecordsContract();
        }

    function updateRecord(UserContract usrCtrct, bool std, bool birthCtr, uint submitDate, uint expDate)
        public
        isWhiteListed(usrCtrct)
        {
            usrCtrct.getRecordsContract().updateData(std, birthCtr, submitDate, expDate);
        }
}