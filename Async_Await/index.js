// console.log("Before");

// function getuser(){
//     setTimeout(()=>{
//         console.log("Hello world");
//     }, 10)
// }

// getuser();
// console.log("after");

//Using callback
console.log("Before");
getUser(1, function(user){
    console.log("user", user);
})

function getUser(id, callback){
    setTimeout(()=>{
        callback ({id:id, githubusername:"mosh"});
    }, 10)
}
console.log("after");


