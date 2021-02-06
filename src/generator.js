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
    // clusters = [ { courses:[ ["c11"], ["c21","c22","c23"], ["c31","c32"] ], nos:2}, { courses:[ ["c41"], ["c51"], ["c61"] ], nos:1} ]
    var reducedClusters = reduceClusters(clusters);
    /* reducedClusters = [ [["c11","c21"], ["c11","c22"], ["c11","c23"], ["c21","c31"], ["c21","c32"], ["c22","c31"], ["c22","c32"], ["c23","c31"], ["c23","c32"]]
                           [["c41"], ["c51"], ["c61"]] ]*/
    var tables = makeTables(reducedClusters);
    /* tables = [ [ 'c11', 'c21', 'c41' ], [ 'c11', 'c21', 'c51' ], [ 'c11', 'c21', 'c61' ], [ 'c11', 'c22', 'c41' ], [ 'c11', 'c22', 'c51' ], [ 'c11', 'c22', 'c61' ],
                  [ 'c11', 'c23', 'c41' ], [ 'c11', 'c23', 'c51' ], [ 'c11', 'c23', 'c61' ], [ 'c21', 'c31', 'c41' ], [ 'c21', 'c31', 'c51' ], [ 'c21', 'c31', 'c61' ],
                  [ 'c21', 'c32', 'c41' ], [ 'c21', 'c32', 'c51' ], [ 'c21', 'c32', 'c61' ], [ 'c22', 'c31', 'c41' ], [ 'c22', 'c31', 'c51' ], [ 'c22', 'c31', 'c61' ],
                  [ 'c22', 'c32', 'c41' ], [ 'c22', 'c32', 'c51' ], [ 'c22', 'c32', 'c61' ], [ 'c23', 'c31', 'c41' ], [ 'c23', 'c31', 'c51' ], [ 'c23', 'c31', 'c61' ],
                  [ 'c23', 'c32', 'c41' ], [ 'c23', 'c32', 'c51' ], [ 'c23', 'c32', 'c61' ]  ]*/
    var validatedTables = validateTables(tables);

    var printedTables = printTables(validatedTables);

    return printedTables;
}

module.exports = generateTables;