pragma solidity ^0.4.2;

contract realEstate{
    
    struct components
    {
       bytes32 description;
       bytes32 datetime;
    }
    mapping (uint8 => components) public realEstateRecord;
    uint8 public mylength;

    constructor() public
    {
        //mylength=0;    
    }
    
    function setRecord(bytes32 mydesc, bytes32 mydate) public
    {
        
        components memory cr;
        cr.description=mydesc;
        cr.datetime=mydate;
        realEstateRecord[mylength] = cr;
        mylength++;

    }
    
    function getRecordDescription(uint8 mynum) constant public returns(bytes32)
    {
        return realEstateRecord[mynum].description;
    }
    
    function getRecordDateTime(uint8 mynum) constant public returns(bytes32)
    {
        return realEstateRecord[mynum].datetime;
    }
    
    function getRecordSize() constant public returns(uint8){
        return mylength;
    }
    
    
    
}