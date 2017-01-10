//global scope
var link, node;
var myLink=[];
var myInput=[];
var width = window.innerWidth,
	height = window.innerHeight,
	radius = (width+height)/2/100;
var nodeStrokeFill="lightblue";
var nodeStrokeColor="#fff";
var linkStrokeWidth = radius/2;
var simulation = d3.forceSimulation()
	.force("charge", d3.forceManyBody().strength(-1000))
	.force("link",d3.forceLink().distance(100).strength(.6))
	.force("x", d3.forceX(width/2))
	.force("y", d3.forceY(height/2));

	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);
	d3.json("graphmap.json",function(err,myJson){
		if(err){
			console.log("Fail open file.");
		}
		for(var key in myJson){
			var tempObject;
			tempObject = myJson[key];
			tempObject.id = key;
			myInput[myInput.length]=tempObject;
		}
		//using the basic way to solve sync/async problem 
	updatePage();
	});


function updatePage(){
	createLinks(myInput);
	//Always make line draw prior order (compare to the node)
	link = svg
		.selectAll(".line")
		.data(myLink)
		.enter()
		.append("line")
		.attr("stroke-width",linkStrokeWidth)
		.attr("class","line");

	node = svg.selectAll(".node")
		.data(myInput)
		.enter().append("g")
		.attr("class","circle")
		.call(d3.drag()
				.on("start",dragstarted)
				.on("drag",dragged)
				.on("end",dragended));


	node.append("circle")
		.attr("r",radius )
		.style("fill", function(d) { return nodeStrokeFill; })
		.style("stroke", function(d) { return nodeStrokeColor; });

	node.append("text")
		.attr("x",12)
		.attr("dy", ".35em")
		.attr("class","text")
		.text(function(d){return d.id;});

	node.on("click",clicked);

	//Using here to automatic draw the position of the picture with forcelayout
	simulation
		.nodes(myInput);
	simulation.force("link")
		.links(myLink);
	simulation
		.on("tick", tick);

}

function tick() {
	link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	node
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}

function updateLinks(targetPoint){
	link.style("stroke",function(d){
		if(d.target.id === targetPoint || d.source.id === targetPoint){
			return "#999";
		}
		else{
			return "transparent";
		}
	});
}

function clicked(d){
	updateLinks(d.id);
}
function createLinks(nodeInput){
	for( var node in nodeInput){
		var tempObj={};
		for(var key in nodeInput[node]){
			if(key!="id"){
				tempObj={};
				tempObj.number=nodeInput[node][key];
				tempObj.source=nodeInput[node];
				tempObj.target=nodeInput[key];
				myLink.push(tempObj);
			}
		}
	}
}
