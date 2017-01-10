var express= require('express');
var app = express();
var fs = require('fs');
var index_html;
app.use(express.static('public'));

app.get('/',(req,res)=>
		{
			fs.readFile('./show-graph.html','utf8',(err,html)=>
					{
						res.send(html);
					});
		});
app.listen(3000);
