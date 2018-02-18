pragma solidity ^0.4.11;

import "./medical_record.sol";
import "./user.sol";

contract Provider {
    using MedicalRecordLib for MedicalRecordLib.Data;
    using UserLib for UserLib.User;

    modifier isWhiteListed(UserManager usrMgr) {
        require(usrMgr.isWhiteListed(msg.sender));
        _;
    }

    function addRecord(UserManager usrMgr, string property, string value)
        public
        isWhiteListed(usrMgr)
        {
            usrMgr.user.records.insert(property, value);
        }
}