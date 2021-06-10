var count = {students:0,tables:0}


const getCount = ()=>{
    return count
}
const incrementCount = (students,tables)=>{
    count.students += students
    count.tables += tables
}

module.exports = {getCount, incrementCount}