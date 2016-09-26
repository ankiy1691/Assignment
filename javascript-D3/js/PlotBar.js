
function plotBar(){
var margin={top:20,right: 30,bottom:130,left: 90},
			width=1000 -margin.right -margin.left,
			height=600 -margin.top -margin.bottom;

var svg=d3.select("ccontent")
			.classed("svg-container", true)
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 1000 800")
			.classed("svg-content-responsive", true)
											.append("g")
											.attr("transform", "translate("+margin.left+","+margin.right+")");
											
											
//define the x-y scales

var xScale=d3.scale.ordinal()
							.rangeRoundBands([0,width],0.2,0.2);
							
var yScale=d3.scale.linear()
							.range([height,0]);


//define axis
var xAxis=d3.svg.axis()
						.scale(xScale)
						.orient("bottom");
						
var yAxis=d3.svg.axis()
						.scale(yScale)
						.orient("left");

d3.json("data/bar.json",function(error,data){
	
	if(error)console.log("Error : data not loaded");
	  
	
	data.forEach(function(d){
		d["Life expectancy at birth, total (years)"]=+d["Life expectancy at birth, total (years)"];
		d["Country"]=d["Country"];
		//console.log(d["Country Name"]);
	})



data.sort(function(a,b){
	return b["Life expectancy at birth, total (years)"]-a["Life expectancy at birth, total (years)"];
	
});

// domain of x and y scales

xScale.domain(data.map(function(d){return d["Country"];})) ;
yScale.domain([0,d3.max(data,function(d){return d["Life expectancy at birth, total (years)"];})]) ;
//draw the bars
svg.selectAll('rect')
.data(data)
.enter()
.append('rect')
.transition()
.duration(2000)
.attr("height",0)
.attr("y",height)
.transition().duration(3000)
.delay(function(d,i){return i+200;})
.attr({
	"x":function(d){return xScale(d["Country"]);},
	"y":function(d){return yScale(+d["Life expectancy at birth, total (years)"]);},
	"width":xScale.rangeBand(),
	"height":function(d){return height-yScale(+d["Life expectancy at birth, total (years)"]);}
	
		})
		.style("fill",function(d,i){return "rgb(20,20,"+((i*30)+100)+")"})  ;
//labels the bars
svg.selectAll("text")
.data(data)
.enter()
.append("text")
.text(function(d){return d["Life expectancy at birth, total (years)"];})
.attr("x",function(d){return xScale(d["Country"])+xScale.rangeBand()/2;})
.attr("y",function(d){return yScale(d["Life expectancy at birth, total (years)"])-5;  })
.style("fill","red")
.style("padding-right","40")
.style("text-anchor","middle")
.style("font-size","10px");

svg.append("g")
.attr("class","x axis")
.attr("transform","translate(0,"+height+")")		
.call(xAxis)
.selectAll("text")
.attr("transform","rotate(-60)")
.attr("dx","-.8em")
 .attr("dy",".25em")
 .style("text-anchor","end")
 .style("font-size","12px");		
		
	
svg.append("g")
.attr("class","y axis")
.call(yAxis)
.style("font-size","12px");
});

}