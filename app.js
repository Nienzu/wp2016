var express= require('express');
var app = express();
var fs = require('fs');
var index_html;
app.use(express.static('public'));
fs.readFile('./force-graph.html','utf8',(err,html)=>
		{
			index_html=html;	
			console.log(html);
		});

app.get('/',(req,res)=>
		{
			res.send(index_html);
		});
app.listen(3000);
