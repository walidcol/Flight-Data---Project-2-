var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("/data/flights.csv", function(err, flightData) {
    if (err) throw err;
    console.log(flightData);

    //flightData.forEach(function(data) {
    //data.AIRLINE = +data.AIRLINE;
    //data.CANCELLED = +data.CANCELLED;
  //});

  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(flightData, function(data) {
      return data.CANCELLED;
  });
  
  xMax = d3.max(flightData, function(data) {
      return data.CANCELLED;
  });
  
  yMin = d3.min(flightData, function(data) {
      return data.AIRLINE;
  });
  
  yMax = d3.max(flightData, function(data) {
      return data.AIRLINE;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);
});



  