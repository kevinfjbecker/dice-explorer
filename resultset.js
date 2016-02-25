// Descent Dice Combination Explorer

/////////////////////////////////////////////////////////////// Descent Dice //

function blueDieResultSet () {
  var values = [
    'miss',
    'r2h2s1',
    'r3h2s0',
    'r4h2s0',
    'r5h1s0',
    'r6h1s1',
  ];
  return new ResultSet(values);
}

function redDieResultSet () {
  var values = [
    'r0h1s0',
    'r0h2s0',
    'r0h2s0',
    'r0h2s0',
    'r0h3s0',
    'r0h3s1',
  ];
  return new ResultSet(values);
}

function yellowDieResultSet () {
  var values = [
    'r0h1s1',
    'r0h2s0',
    'r0h2s1',
    'r1h0s1',
    'r1h0s1',
    'r2h1s0',
  ];
  return new ResultSet(values);
}

function blackDieResultSet () {
  var values = [
    's0',
    's2',
    's2',
    's2',
    's3',
    's4',
  ];
  return new ResultSet(values);
}

function grayDieResultSet () {
  var values = [
    's0',
    's1',
    's1',
    's1',
    's2',
    's3',
  ];
  return new ResultSet(values);
}

function brownDieResultSet () {
  var values = [
    's0',
    's0',
    's0',
    's1',
    's1',
    's2',
  ];
  return new ResultSet(values);
}

///////////////////////////////////////////////////////////////////// Result //

var Result = function (value) {
  this.value = this.parse(value);
};

Result.prototype.combine = function(r) {

  if(r instanceof Result) {

    var value,
        totalShields,
        totalHearts;

    if(this.value.miss || r.value.miss) {

      value = 'miss';

    } else if(isAttackDieResult(this) || isAttackDieResult(r)) {

      totalShields = (this.value.shields||0) + (r.value.shields||0);
      totalHearts = (this.value.hearts||0) + (r.value.hearts||0);

      if(totalShields > totalHearts) {

        totalShields = totalShields - totalHearts;
        totalHearts = 0;

      } else {

        totalHearts = totalHearts - totalShields;
        totalShields = 0;

      }

      value = 'r' + ((this.value.range||0) + (r.value.range||0)) +
        'h' + totalHearts +
        's' + ((this.value.surges||0) + (r.value.surges||0)) +
        (totalShields > 0 ? 's'+totalShields : '');

    } else {

      value = 's' + (this.value.shields + r.value.shields);

    }

    return new Result(value);

  }

  if(r instanceof ResultSet) {

    var that = this,
        values = r.values.map(function(r){ return r.combine(that).toString(); });

    return new ResultSet(values);

  }

};

Result.prototype.parse = function(s){
  var values;
  if(s === 'miss') {
    return { miss: true };
  }
  if(/r(\w+)h(\w+)s(\w+)s(\w+)/.exec(s)) {
    values = /r(\w+)h(\w+)s(\w+)s(\w+)/.exec(s);
    return {
      range: Number.parseInt(values[1]),
      hearts: Number.parseInt(values[2]),
      surges: Number.parseInt(values[3]),
      shields: Number.parseInt(values[4])
    };
  }
  if(/r(\w+)h(\w+)s(\w+)/.exec(s)) {
    values = /r(\w+)h(\w+)s(\w+)/.exec(s);
    return {
      range: Number.parseInt(values[1]),
      hearts: Number.parseInt(values[2]),
      surges: Number.parseInt(values[3])
    };
  }
  return { shields: Number.parseInt(/s(\w+)/.exec(s)[1]) };
};

Result.prototype.toString = function(){
  if(this.value.miss) {
    return 'miss';
  }
  if(isAttackDieResult(this) && this.value.shields > 0) {
    return 'r' + this.value.range +
      'h' + this.value.hearts +
      's' + this.value.surges +
      's' + this.value.shields;
  }
  if(isAttackDieResult(this)) {
    return 'r' + this.value.range +
      'h' + this.value.hearts +
      's' + this.value.surges;
  }
  return 's' + this.value.shields;
};

////////////////////////////////////////////////////////////////// ResultSet //

var ResultSet = function(values){
  this.values = values.map(function(v){
    return new Result(v);
  });
};

ResultSet.prototype.combine = function(r) {
  if(r instanceof Result) {
    return r.combine(this);
  }
  if(r instanceof ResultSet) {
    var b = r,
        values;

    values = this.values
      .map(function(r){return r.combine(b).values;})
      .reduceRight(function(prev, curr){return curr.concat(prev);})
      .map(function(r){return r.toString();});
    return new ResultSet(values);
  }
};

//////////////////////////////////////////////////////////////////// utility //

function resultSetToArray(rs) {
  return rs.values.map(function(r){return r.toString();});
}

function resultCounts(rs) {
  var counts = {},
      values = resultSetToArray(rs);

  values.forEach(function(v){
    if(counts[v] === undefined) {
      counts[v] = 1;
    } else {
      counts[v] = counts[v] + 1;
    }
  });

  return counts;
}

function isAttackDieResult(r) {
  return r.miss !== undefined ||
    r.value.range !== undefined ||
    r.value.hearts !== undefined ||
    r.value.surges !== undefined;
}
