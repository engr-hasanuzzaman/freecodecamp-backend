// console.log(process.argv)
args_size = process.argv.length
sum = 0
for(i = 2; i < args_size; i++){
  sum += Number(process.argv[i])
}
/*
* functional way to calculate sum of int array
*/
// process.argv.slice(2).reduce((acc, value)=>{ return acc += Number(value)})

console.log(sum)
