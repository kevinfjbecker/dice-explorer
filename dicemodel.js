
var diceSet = (function() {

  var data = ['blue', 'yellow', 'grey'],
      combinations = blueDieResultSet()
        .combine(yellowDieResultSet())
        .combine(grayDieResultSet());

  function getResultSet() {
    return combinations;
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
