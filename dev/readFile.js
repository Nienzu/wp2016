var jsonfile = require('jsonfile');

var result;

result = jsonfile.readFileSync('package.json',function(err,obj){});
console.log(result);
