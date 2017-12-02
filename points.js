var width = 500,
    height = 500;

// set projection
var projection = d3.geo.mercator();

d3.json("itx.topojson", function(error, it) {

    var projection = d3.geo.albers()
        .center([0, 41])
        .rotate([347, 0])
        .parallels([35, 45])
        .scale(2000)
        .translate([width / 2, height / 2]);

    var subunits = topojson.feature(it, it.objects.sub);

    var path = d3.geo.path()
        .projection(projection);

    // create svg variable
    var svg = d3.select("body").append("svg")
    				.attr("width", width)
    				.attr("height", height);

    // points
    aa = [41.8919300, 12.5113300];
	bb = [45.464211, 9.191383];

	console.log(projection(aa),projection(bb));

	// add states from topojson
	svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

    // put boarder around states
  	svg.append("path")
      .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);

    // add circles to svg
    svg.selectAll("circle")
		.data([aa,bb]).enter()
		.append("circle")
		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "8px")
		.attr("fill", "red")

});
