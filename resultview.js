
var svgVis = d3.select('#resultset-view').append('svg')
      .attr('height', 500)
      .attr('width', 800);

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

  svgVis.selectAll('rect')
      .data(valueCounts)
    .enter().append('rect')
      .attr('width', 20)
      .attr('height', function(d){ return d * 20; })
      .attr('x', function(d,i){ return i * 20; })
      .attr('y', function(d){ return 220 - (d * 20) ; })
      .style('stroke', 'white')
      .style('fill', 'steelblue');
}
