const datadict = require('../resources/datadict.json');

function matchSections(s1,s2){
    for(var i in time1){
        if (s1.time[i] & s2.time[i]) return false;
    }
    if(s1.compre === s2.compre) return false;
    return true;
}

function makeSubsets(cluster,size){
    
}

function generateTimetables(clusters){
    
}
