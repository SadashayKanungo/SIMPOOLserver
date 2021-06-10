const cdcdict = require('../resources/cdcdict.json')

const getCdc = (bitsid) => {
    
    var todayYear = new Date().getFullYear()
    var todayMonth = new Date().getMonth() + 1
    
    var sem = (todayYear - parseInt(bitsid.slice(0,4))) * 2
    if(parseInt(todayMonth) >= 6) sem=sem+1

    var branch = (bitsid[4]==='A') ? bitsid.slice(4,6) : bitsid.slice(4,8)

    return cdcdict[branch][String(sem)]
}

module.exports = getCdc