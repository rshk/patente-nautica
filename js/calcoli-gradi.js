$(function(){
  var genDeg = function(){
    return {
        deg: Math.floor(Math.random() * 360) % 360,
        pri: Math.floor(Math.random() * 60) % 60,
        sec: Math.floor(Math.random() * 60) % 60
    }
  };
  var d2n = function(d, p, s) {
    d = d % 360; // Degrees must be modulo 360
    return (((d * 60) + p) * 60) + s;
  };
  var n2d = function(n) {
    return {
      deg: Math.floor(n / 3600) % 360,
      pri: Math.floor(n / 60) % 60,
      sec: Math.floor(n) % 60
    };
  };

  // ------------------------------------------------------------
  //   Sum/subtract
  // ------------------------------------------------------------
  $('#sumsub-message').hide();
  var generateNew = function(){
    $('#sumsub-message').hide();
    var elems = ['#sumsub-1', '#sumsub-2'], el, i;
    for (var i in elems) {
      el = elems[i];
      var d = genDeg();
      $(el + ' > :nth-child(1)').html(d.deg + "&deg;").data('value', d.deg);
      $(el + ' > :nth-child(2)').html(d.pri + "'").data('value', d.pri);
      $(el + ' > :nth-child(3)').html(d.sec + "''").data('value', d.sec);
    };
  };
  $('#sumsub').submit(function(e){
    e.preventDefault();
    var num1 = d2n(
      $('#sumsub-1 > :nth-child(1)').data('value'),
      $('#sumsub-1 > :nth-child(2)').data('value'),
      $('#sumsub-1 > :nth-child(3)').data('value'));
    var num2 = d2n(
      $('#sumsub-2 > :nth-child(1)').data('value'),
      $('#sumsub-2 > :nth-child(2)').data('value'),
      $('#sumsub-2 > :nth-child(3)').data('value'));
    var result = d2n(
      parseInt($('#sumsub-res > :nth-child(1) input').val()),
      parseInt($('#sumsub-res > :nth-child(2) input').val()),
      parseInt($('#sumsub-res > :nth-child(3) input').val())
    );
    var operator = $('#sumsub-operator').val(), expected;
    if (operator === '+') {
      expected = num1 + num2;
    }
    else if (operator === '-') {
      var expected = num1 - num2;
    }
    else {
      alert('ERROR!');
      return;
    }
    if (result === expected) {
      $('#sumsub-message')
        .removeClass('alert-danger')
        .addClass('alert-success')
        .html("Risultato corretto!")
        .show();
    }
    else {
      var dg = n2d(expected);
      $('#sumsub-message')
        .removeClass('alert-success')
        .addClass('alert-danger')
        .html("Sbagliato! Il risultato corretto era: " + dg.deg + "° " + dg.pri + "' " + dg.sec + "''")
        .show();
    }
  });
  $('#sumsub-new').click(function(){
    generateNew();
  });
  generateNew();

  // ------------------------------------------------------------
  $('#conv-1calc').click(function(){
    var val2 = parseInt($('#conv-val-2').val());
    $('#conv-val-1').val(val2 / 6);
  });
  $('#conv-1gen').click(function(){
    $('#conv-val-1').val(Math.floor(Math.random() * 10) % 10);
  });
  $('#conv-1check').click(function(){
    var val1 = parseInt($('#conv-val-1').val()),
        val2 = parseInt($('#conv-val-2').val()),
        expected = val2 / 6;
    if (val1 == expected) {
      alert("Corretto!");
    }
    else {
      alert("Sbagliato! Risultato corretto: " + expected);
    }
  });

  $('#conv-2calc').click(function(){
    var val1 = parseInt($('#conv-val-1').val());
    $('#conv-val-2').val(val1 * 6);
  });
  $('#conv-2gen').click(function(){
    $('#conv-val-2').val(Math.floor(Math.random() * 60) % 60);
  });
  $('#conv-2check').click(function(){
    var val1 = parseInt($('#conv-val-1').val()),
        val2 = parseInt($('#conv-val-2').val()),
        expected = val1 * 6;
    if (val2 == expected) {
      alert("Corretto!");
    }
    else {
      alert("Sbagliato! Risultato corretto: " + expected);
    }
  });

});
