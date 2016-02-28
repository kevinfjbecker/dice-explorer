
// (function(){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 340 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

 var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(3, "%");

  var svgVis = d3.select('#resultset-view').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr ('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svgVis.append("g")
    .attr("class", "y axis");

  svgVis.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");


  updateChart(diceSet.getResultSet());


  function updateChart(resultSet){

    var values = resultSet.values.map(function(r){
          return r.value.hearts || 0; // could use hearts etc.
        }),
        valueCounts = [];

    values.forEach(function(v){
      if(!valueCounts[v]){
        valueCounts[v]=1;
      }else{
        valueCounts[v]++;
      }
    });

    // set zero values for undefine indices
    d3.range(valueCounts.length - 1).forEach(function(i){ valueCounts[i] = valueCounts[i] || 0; });

    var countSum = d3.sum(valueCounts),
        valuePercentages = valueCounts.map(function(v){
          return v / countSum;
        });

    y.domain([0, d3.max(valuePercentages) || 1]);
    x.domain(d3.range(valuePercentages.length));

    d3.select('.x.axis').call(xAxis);
    d3.select('.y.axis').call(yAxis);

    var bars = svgVis.selectAll('rect')
        .data(valuePercentages);

    bars.enter().append('rect')
        .style('stroke', 'white')
        .style('fill', 'steelblue');

    bars.attr('x', function(d,i){ return x(i); })
        .attr("y", function(d,i) { return y(d); })
        .attr('width', x.rangeBand())
        .attr("height", function(d) { return height - y(d); });

    bars.exit().remove();

  }

// }());
