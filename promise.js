const p = new Promise((resolve, reject) =>{
    
    reject(1);
   

})

p.then((result) => console.log("output", result));
p.catch((err) => console.log("error", err))