var width = 1500,  height = 1100;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var defs = svg.append('svg:defs');

defs.append("svg:pattern")
    .attr("id", "circle_1")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-1.svg')
    .attr("width", 8)
    .attr("height", 8)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_2")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-2.svg')
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_3")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits","objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-3.svg')
    .attr("width", 12)
    .attr("height", 12)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_4")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-4.svg')
    .attr("width", 14)
    .attr("height", 14)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_5")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-5.svg')
    .attr("width", 16)
    .attr("height", 16)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_6")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-6.svg')
    .attr("width", 18)
    .attr("height", 18)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_7")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-7.svg')
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "circle_8")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Marker-8.svg')
    .attr("width", 22)
    .attr("height", 22)
    .attr("x", 0)
    .attr("y", 0);

defs.append("svg:pattern")
    .attr("id", "legend")
    .attr("width", 40)
    .attr("height", 40)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
    .attr("xlink:href", 'svg/Legend.svg')
    .attr("width", 300)
    .attr("height", 100)
    .attr("x", 0)
    .attr("y", 0);

svg.append("rect")
        .attr("width", 300)
        .attr("height", 100)
        .attr("x", 10)
        .attr("y", 10)
        .style("fill", "#fff")
        .style("fill", "url(#legend)");

// read file ___________________________________________________________________________________________________________

var csvText;
var allLines;
var values = [[],[]];;
var coordinates = [] ;
// Year,Month,Day,Hour,Min,Sec,EpicentralArea,Lat,Lon,Dep,Io,Mw,ErMw
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                allLines = allText.split("\n");
                for(var i = 0; i<allLines.length; i++){
                    values[i] = allLines[i].split(";");
                }
            }
        }
    }
    rawFile.send(null);
}

readTextFile("data.csv");

// DRAW ITALY___________________________________________________________________________________________________________

// d3.json("it.json", function(error, it) {  //COMUNI
d3.json("itx.topojson", function(error, it) {  //REGIONI

var projection = d3.geo.albers()
    .center([0, 41])
    .rotate([347, 0])
    .parallels([35, 45])
    .scale(5000)
    .translate([width / 2, height / 2]);

var subunits = topojson.feature(it, it.objects.sub);

var path = d3.geo.path()
    .projection(projection);

// draw border with sea
svg.append("path")
.datum(topojson.mesh(it, it.objects.sub, function(a, b) { return a === b ; }))
.attr("class", "border_map")
.attr("d", path);

// draw all the features together (no different styles)
svg.append("path")
.datum(subunits)
.attr("class", "map")
.attr("d", path);

// // DRAW POINTS,  LATITUDINE E LONGITUDINE SONO AL CONTRARIO DIO CANE ____________________________________________________________________________

// svg.selectAll("circle")
//     .data(coordinates)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
//     .attr("cy", function (d) { return projection(d)[1]; })
//     .attr("r", "8px")
//     .attr("fill", "red")

// MOUSE behavior __________________________________________________________________________________________________________

terremoti = svg.selectAll("circle")

terremoti.on({
  "mouseover": function(d) {
    d3.select(this).style("cursor", "pointer")
  },
  "mouseout": function(d) {
    d3.select(this).style("cursor", "")
  }
});

drawTerr();

// SLIDER YEARS __________________________________________________________________________________________________________

  d3.select('#slider3').call(d3.slider().axis(d3.svg.axis().ticks(20)).min(1000).max(2014).step(1).value( [ 1800, 2014 ] ).on("slide", function(evt, value) {
    d3.select('#slider3textmin').text(value[ 0 ]);
    d3.select('#slider3textmax').text(value[ 1 ]);
    minYear = value[ 0 ];
    maxYear = value[ 1 ];
    console.log(minYear,maxYear,minMag,maxMag);
    drawTerr();
  }));


  // SLIDER MAGNITUDE __________________________________________________________________________________________________________

    d3.select('#sliderm').call(d3.slider().axis(d3.svg.axis().ticks(13)).min(2).max(8).step(0.1).value( [ 6, 8 ] ).on("slide", function(evt, value) {
      d3.select('#sliderMtextmin').text(value[ 0 ]);
      d3.select('#sliderMtextmax').text(value[ 1 ]);
      minMag = value[ 0 ];
      maxMag = value[ 1 ];
      console.log(minYear,maxYear,minMag,maxMag);
      drawTerr();
    }));

    function drawTerr() {

      // PRINT  CIRCLES __________________________________________________________________________________________________________

      coordinates = [];
      for (var i=0; i< values.length; i++){

        if(values[i][7] != undefined && values[i][8] != undefined && values[i][11] != undefined){

          var c = {
            year: values[i][0],
            month: values[i][1],
            day: values[i][2],
            hour: values[i][3],
            min: values[i][4],
            sec: values[i][5],
            area: values[i][6],
            lat: parseFloat(values[i][7].replace(",",".")),
            long: parseFloat(values[i][8].replace(",",".")),
            dep: values[i][9],
            io: values[i][10],
            mw: parseFloat(values[i][11].replace(",",".")),
            erMw: values[i][12],

            GetPos: function() {
              var pos = [this.long,this.lat];
              return pos;
            },

            GetRadius: function(){
            	if(this.mw<3.75)
            		return 4;
            	if(this.mw<4)
            		return 5;
            	if(this.mw<4.5)
            		return 6;
            	if(this.mw<5)
            		return 7;
            	if(this.mw<5.5)
            		return 8;
            	if(this.mw<6)
            		return 9;
            	if(this.mw<6.5)
            		return 10;
            	if(this.mw<7)
            		return 11;

            },

            GetFill: function(){
            	if(this.mw<3.75)
            		return "url(#circle_1)";
            	if(this.mw<4)
            		return "url(#circle_2)";
            	if(this.mw<4.5)
            		return "url(#circle_3)";
            	if(this.mw<5)
            		return "url(#circle_4)";
            	if(this.mw<5.5)
            		return "url(#circle_5)";
            	if(this.mw<6)
            		return "url(#circle_6)";
            	if(this.mw<6.5)
            		return "url(#circle_7)";
            	if(this.mw<7)
            		return "url(#circle_8)";
            },

            GetInfo: function () {
              return 'Year: '+this.year+' Month: '+this.month+' Day: '+this.day
                    +'\nHour: '+this.hour+' Minute: '+this.min+' Sec: '+this.sec
                    +'\nLocation: '+this.area+' Latitude: '+this.lat+' Longitude: '+this.long
                    +'\nDepth (Km): '+this.dep+' Epicentral intensity: '+this.io+' Magnitude: '+this.mw+'+-'+this.erMw;
            }
          }


          if (values[i][0] >= minYear && values[i][0] <= maxYear && parseFloat(values[i][11].replace(",",".")) >= minMag && parseFloat(values[i][11].replace(",",".")) <= maxMag ){
            coordinates.push(c);
          }
      }

        if (values[i][0] > maxYear) break;


      }

      svg.selectAll("circle").remove();

      svg.selectAll("circle")
      .data(coordinates)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return projection(d.GetPos())[0]; })
      .attr("cy", function (d) { return projection(d.GetPos())[1]; })
      .attr("r", function (d) { return d.GetRadius(); })
      //.attr("fill", "url(#circle_1)")
      //.attr("fill", "red")
      //.attr('xlink:href',"svg/Marker-5.svg")
      .style("fill", "#fff")
      .style("fill", function (d) { return d.GetFill();})
      .append("svg:title")
      .text(function(d) {return d.GetInfo();});

      terremoti = svg.selectAll("circle")

      terremoti.on({
        "mouseover": function(d) {
          d3.select(this).style("cursor", "pointer")
        },
        "mouseout": function(d) {
          d3.select(this).style("cursor", "")
        }
      });
    }


});
