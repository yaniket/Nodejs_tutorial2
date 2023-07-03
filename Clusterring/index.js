// Node.js has gained a lot of popularity in the past few years. It is used by big names like LinkedIn, eBay, and Netflix, which proves it has been battle-tested well.

// Advantages of using clustering in Node.js
// There are some distinct advantages to using clusters in Node.js. As the Node.js app is able to utilize all the CPU resources available (given most computers these days have a multi-core CPU), it will distribute the computing load to these cores. As load is distributed and all the CPU cores are well utilized, this will result in multiple threads improving throughput (measured in requests per second)

// To follow this guide about Node.js clustering, you should have the following:

// Node.js running on your machine, latest LTS is advisable. It is Node.js 18 at the time of writing.
// Working knowledge of Node.js and Express
// Basic knowledge on how processes and threads work
// Working knowledge of Git and GitHub

// Express server without clustering

// Adding Node.js clustering to an Express server
const express = require('express');
const port = 3000;
const cluster = require('cluster');
const totalCPUs = require('node:os').cpus().length;
const process = require('node:process');

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
  startExpress();
}

function startExpress() {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/api/slow', function (req, res) {
    console.time('slowApi');
    const baseNumber = 7;
    let result = 0;    
    for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {        
      result += Math.atan(i) * Math.tan(i);
    };
    console.timeEnd('slowApi');

    console.log(`Result number is ${result} - on process ${process.pid}`);
    res.send(`Result number is ${result}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

// If we hit http://localhost:3000/api/slow we will see the following output, identical to the output from the previous non-clustering server:

// Final thoughts on Node.js clustering
// Using clustering on our own is beneficial for performance as seen above. For a production-grade system, it would be better to use battle-tested software like PM2. It has cluster mode built in, and includes other great features like process management and logs.

// Similarly, for a production-level Node.js application running in containers on kubernetes, the resource management part might be better handled by kubernetes. Even with kubernetes, if the application is allocated less than one CPU core, having or not having clusters won’t make a difference. Generally speaking, load balancing will be better done by a dedicated load balancer than code within an application.

// These are the decisions and tradeoffs you and your software engineering team will need to make to have a more scalable, performant, and resilient Node.js application running on a production environment.


// In this article, we learned how to exploit the Node.js cluster modules to fully utilize the available CPU cores to extract better performance from our Node.js application.