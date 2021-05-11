const datadict = require('../resources/datadict.json');

function makeSubsets(courses,nos){
    var subsets = [];    
    function addCourse(subset, courses, nos){
        if(courses.length === 0) return;

        for(var sec of courses[0]){
            tempset = subset.slice();
            tempset.push(sec);
            if(tempset.length === nos) subsets.push(tempset);
            else addCourse(tempset, courses.slice(1), nos);
        }
        addCourse(subset, courses.slice(1), nos);
    }
    addCourse([],courses,nos);
    return subsets;
}

function reduceClusters(clusters){
    var reduced = [];
    for (var cluster of clusters){
        reduced.push(makeSubsets(cluster.courses, cluster.nos));
    }
    return reduced;
}

function makeTables(clusters){
    var tables = [];
    function addChoice(table, clusters){
        if(clusters.length === 0){
            tables.push(table);
            return;
        }  
        for(var choice of clusters[0]){
            temptable = table.slice();
            temptable = temptable.concat(choice);
            addChoice(temptable, clusters.slice(1));
        }
    }
    addChoice([],clusters);
    return tables;
}

function lookup(id){
    let [c,s] = id.split(' ');
    return datadict[c].sec[s];
}

function validateTables(tables){
    
    function matchSections(table){
        var times = new Array(72).fill(0);
        var compres = [];
        for (var secid of table){
            var sec = lookup(secid);
            for(var i in times){
                if (sec.time[i]){
                    if(times[i]) return false;
                    else times[i]=1;
                }                
            }
            if(compres.includes(sec.compre)) return false;
            else compres.push(sec.compre);
        }
        return true;
    }

    return tables.filter(matchSections);
}

function printTables(tables){

    function print(table){
        var printout = new Array(72).fill("-");
        for(sec of table){
            var time = lookup(sec).time;
            for(i in time){
                if(time[i]) printout[i] = sec;
            }
        }
        return printout;
    }

    var prints = [];
    for(var table of tables){
        prints.push({courses:table, print:print(table)});
    }
    return prints;
}

function generateTables(clusters){
    /* clusters = [ { "courses":[ ["ECON_F211 L1+T1"], ["ECON_F213 L1+T1"], ["ECON_F212 L1+T1"] ], "nos":3}, 
                    { "courses":[ ["MATH_F211 L1+T1"], ["MATH_F211 L2+T2"], ["MATH_F211 L3+T4"], ["MATH_F211 L4+T4"] ], "nos":1},
                    {"courses":[ ["GS_F211 L1"], ["GS_F212 L1"], ["GS_F221 L1"], ["GS_F231 L1"] ], "nos":2} ]*/
    
    var reducedClusters = reduceClusters(clusters);
    /* reducedClusters = */
    
    var tables = makeTables(reducedClusters);
    /* tables = */
    
    var validatedTables = validateTables(tables);
    /* validatedTables = */
    
    var printedTables = printTables(validatedTables);
    /* printedTables = [ {"courses": [...], "print": [...] }, x20]*/
    
    return printedTables;
}

module.exports = generateTables;