// const p = new Promise((resolve, reject) =>{
    
//     reject(1);
   

// })

// p.then((result) => console.log("output", result));
// p.catch((err) => console.log("error", err))

// What will be the output
async function test(){
    console.log('1');
    await 10;

    setTimeout(()=>{
       console.log("Output");
    })

    console.log('1')

}

console.log(test());