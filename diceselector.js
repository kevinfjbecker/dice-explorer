// Dice Selector //////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

var withHeight = 50;
var padding = 5;
var rounding = 10;

///////////////////////////////////////////////////////////////////////////////

var data = ['blue', 'yellow', 'grey'];
var svgUi = d3.select('#selector-ui').append('svg')
.attr('width', 400);

///////////////////////////////////////////////////////////////////////////////

update();

///////////////////////////////////////////////////////////////////////////////

function diceMenu() {

  var menu = svgUi.append('g');
  var diceOptions = ['Sienna','grey','black','blue','red','yellow'];

  menu.append('rect')
    .attr('width', (withHeight + padding) * diceOptions.length + padding)
    .attr('height', withHeight + 2 * padding)
    .attr('rx', rounding)
    .attr('ry', rounding)
    .style('fill', 'white')
    .style('stroke', 'black');

  menu.append('g').selectAll('rect')
    .data(diceOptions)
    .enter().append('rect')
    .attr('width', withHeight)
    .attr('height', withHeight)
    .attr('x', function(d, i){ return (withHeight + padding)  * i + padding; })
    .attr('y', padding)
    .attr('rx', rounding)
    .attr('ry', rounding)
    .style('fill', function(d){ return d3.rgb(d).brighter(); })
    .style('stroke', function(d){ return d3.rgb(d).darker(); })
    .on('click', function(d){
      data.push(d);
      menu.remove();
      update();
    });
}

function update() {
  var dice = svgUi.selectAll('rect')
  .data(data);

  dice.enter().append('rect')
    .attr('width', withHeight)
    .attr('height', withHeight)
    .attr('x', function(d, i){ return (withHeight + padding)  * i; })
    .attr('rx', rounding)
    .attr('ry', rounding);

  dice.style('fill', function(d){ return d3.rgb(d).brighter(); })
    .style('stroke', function(d){ return d3.rgb(d).darker(); })
    .style('stroke-dasharray', null)
    .on('click', function(d, i){
      data.splice(i, 1);
      update();
    });

  if(data.length < 5) {
    svgUi.append('rect')
      .attr('width', withHeight)
      .attr('height', withHeight)
      .attr('x', data.length * (withHeight + padding))
      .attr('rx', rounding)
      .attr('ry', rounding)
      .style('fill', 'white')
      .style('stroke', '#222')
      .style('stroke-dasharray', "3, 3")
      .on('click', function(){ diceMenu(); });
  }

  dice.exit().remove();

}
