var decoy = true;
var fam = true;

$(document).ready(() => {
    $('.close-overlay').on('click', () => {closeOverlay()});

    $('.footer').on('click', () => {
      if (decoy) {
        decoy = false;
        fam = true;
        $('.footer > h2').text('Merry Christmas 🎁')
      } else if (!decoy && fam) {
        fam = false;
        $('.footer > h2').text('Merry Christmas 🎅')
      } else {
        decoy = true;
        fam = true;
        $('.footer > h2').text('Merry Christmas 🎄')
      }
    });

    $('.closed-present').on('click', () => {
    	if (! $('#present-box').hasClass('opened')){
    		openPresent()
    	}});

    $('.locked-present').on('click', () => {
    	$('.locked-present').effect('shake', {times:2}, 500);
    });

    showPresent();
});

function checkDate() {
	var d = new Date();
	console.log(d);
    if (d.getFullYear() > 2018) {
    	return true;
    }
    if (d.getFullYear() < 2018) {
    	return false;
    }
    if (d.getMonth() < 11) {
    	return false;
    }
    if (d.getDate() < 25) {
    	return false;
    }
    return true;
}

function closeOverlay() {
	$('.overlay').hide();
	$('.present').hide();
	$('.present').children().hide();
	$('.gift').hide();
}

function showPresent() {
	$('.present').show();
	if (! checkDate()) {
		console.log('locked present')
		$('.locked-present').fadeIn('slow');
	} else {
		$('.closed-present').fadeIn('slow');
	}
}

function openPresent() {
	$('#present-box').addClass('opened');
	for (var i = 1; i <= 3; i++) {
		$('.closed-present').effect('shake', {times:i}, 500).delay(500);
	}
	$('.closed-present').effect('shake', {times:8}, 1000, () => {
		$('.opened-present').show().delay(250).fadeOut('slow', () => {
      if ($('.ohyoon').length > 0){
        if (decoy){
          $('#decoy').show();
        } else if (fam){
          $('#fam').show();
        } else {
          $('#real').show();
        }
      }
			$('.gift').show().addClass('appear',100);
		});
		launchConfetti();
		$('.closed-present').hide();
		$('.footer').show();
	});
}

function goBack() {
  window.history.back();
}

//Confetti!
function launchConfetti() {
  var multiplier = .125;
  var numConfetti = Math.floor(multiplier * $(document).width() + 10);
  var iterations = 0;
  var maxIter = 7;
  var count = 0;

  for (var i = 0; i < numConfetti; i++) {
    create(i);
  }

  function create(i) {
    var width = Math.random() * 8;
    var height = width * 0.4;
    var colourIdx = Math.ceil(Math.random() * 3);
    var colour = "red";
    switch(colourIdx) {
      case 1:
        colour = "yellow";
        break;
      case 2:
        colour = "blue";
        break;
      default:
        colour = "red";
    }
    $('<div class="confetti-'+i+' '+colour+'"></div>').css({
      "width" : width+"px",
      "height" : height+"px",
      "top" : -Math.random()*20+"%",
      "left" : Math.random()*100+"%",
      "opacity" : Math.random()+0.5,
      "transform" : "rotate("+Math.random()*360+"deg)"
    }).appendTo('.wrapper');  
    
    drop(i);
  }

  function drop(x) {
    if (iterations < maxIter){
      $('.confetti-'+x).animate({
        top: "100%",
        left: "+="+Math.random()*15+"%"
      }, Math.random()*3000 + 3000, function() {
        reset(x);
      });
      count += 1;
      if (count > numConfetti) {
        count = 0;
        iterations += 1;
      }
    } else {
      $('.confetti-'+x).remove();
    }
  }

  function reset(x) {
    $('.confetti-'+x).animate({
      "top" : -Math.random()*20+"%",
      "left" : "-="+Math.random()*15+"%"
    }, 0, function() {
      drop(x);             
    });
  }
}