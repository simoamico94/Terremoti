var width = 1500,  height = 1100;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var defs = svg.append('svg:defs');

defs.append("svg:pattern")
    .attr("id", "grump_avatar")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-6.svg')
    .attr("width", 40)
    .attr("height", 40)
    .attr("x", 0)
    .attr("y", 0);

var circle = svg.append("circle")
        .attr("cx", 40/2)
        .attr("cy", 40/2)
        .attr("r", 40/2)
        .style("fill", "#fff")
        .style("fill", "url(#grump_avatar)");
