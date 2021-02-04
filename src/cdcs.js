const cdcdict = require('../resources/cdcdict.json');

function getCdc(key){
    let sem = key[0],
        branch = key.slice(1);
    return cdcdict[branch][sem];
}

module.exports = getCdc;