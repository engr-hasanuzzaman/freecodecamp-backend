// console.log(process.argv)
args_size = process.argv.length
sum = process.argv.slice(2).map((n)=> Number(n)).reduce((acc, value)=>{ return acc += Number(value)})
console.log(sum)
