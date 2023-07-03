let arr = [true,false,0,null,undefined,1,2,NaN,""];
let newArr = []
// let out = arr.filter((e)=>!e)
// console.log(out);

for(let i=0; i<arr.length; i++){
    if(arr[i] || arr[i] === 0){
        newArr.push(arr[i])
    }
}
console.log(newArr);