const fs = require("fs");

// This file does not exists
const file = "file12.txt";

// Error first callback
// function with two
// arguments error and data
const ErrorFirstCallback = (err, data) => {
if (err) {
	return console.log(err);
}
console.log("Function successfully executed");
};

// function execution
// This will return
// error because file do
// not exist
fs.readFile(file, ErrorFirstCallback);
