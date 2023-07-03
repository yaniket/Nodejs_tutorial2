// In synchrounous code it waits until the process completes
// In asynchronous code  it does not wait and the process runs in backend

// Patterns for dealing with asynchronous code
// 1. Callback
// 2. Promises
// 3. Asyc_Await
// Callback implementation
console.log("before");
getuser(1, function(user){
    console.log("user", user);

    getRepository(user.githubusername, (repos)=>{
        console.log("repos", repos);
    })
});
console.log('after');

function getuser(id , callback ){
    setTimeout(()=>{
    //   console.log("hello world");
      callback({id: id, githubusername: 'mosh'})
    }, 2000)

}

function getRepository(username , callback ){
    setTimeout(()=>{
    //   console.log("hello world");
      callback(["repo1", "repo2"])
    }, 3000)

}


