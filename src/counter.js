var count = {students:0,tables:0};

const counter = {};
counter.getCount = ()=>{
    return count;
}

counter.incrementCount = (students,tables)=>{
    count.students += students;
    count.tables += tables;
}

module.exports = counter;