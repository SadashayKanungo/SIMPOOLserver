var count = {students:0,lists:0,tables:0};

const counter = {};
counter.getCount = ()=>{
    return count;
}

counter.incrementCount = (students,lists,tables)=>{
    count.students += students;
    count.lists += lists;
    count.tables += tables;
}

module.exports = counter;