const fs = require('fs').promises;
const diffDates = require("diff-dates");

async function CheckSession() {
    try{
    var LastLoginDate = await fs.readFile('./dataExtractor/AccessInstagram/loginDate.json');
    var LastLoginDateConverted = JSON.parse(LastLoginDate);
    }
    catch{
        return false
    }
    //Checks if the last login date is longer than 2 days
    if ( diffDates(new Date(), new Date(LastLoginDateConverted), "days") > 1 ) return false
    else return true
}

module.exports = CheckSession;