
var diceSet = (function() {

  var colorMap = {
        'brown': brownDieResultSet,
        'grey': grayDieResultSet,
        'black': blackDieResultSet,
        'blue': blueDieResultSet,
        'red': redDieResultSet,
        'yellow': yellowDieResultSet,
        'green': greenDieResultSet
      },
      data = ['blue', 'yellow', 'grey'];
 

  function getResultSet() {
    if(data.length === 0) {
      return new ResultSet([]);
    }
    return data.map(function(color){
        return colorMap[color]();
      }).reduce(function(prevResultSet, currResultSet){
        return prevResultSet.combine(currResultSet);
      })
  }

  function getDiceList() {
    return data.slice(0);
  }

  function push(colorString) {
    data.push(colorString);
  }

  function remove(index) {
    data.splice(index, 1);
  }
  return {
    getDiceList: getDiceList,
    getResultSet: getResultSet,
    push: push,
    remove: remove
  };


} ());
