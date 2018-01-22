$(function () {
	var countDown;
  	var timeLoss = 59;
	var app = {
		cards: [
			"fa fa-diamond",
			"fa fa-diamond",
			"fa fa-paper-plane-o",
			"fa fa-paper-plane-o",
			"fa fa-anchor",
			"fa fa-anchor",
			"fa fa-bolt",
			"fa fa-bolt",
			"fa fa-cube",
			"fa fa-cube",
			"fa fa-leaf",
			"fa fa-leaf",
			"fa fa-bicycle",
			"fa fa-bicycle",
			"fa fa-bomb",
			"fa fa-bomb"
		],
		init: function () {
			app.shuffle();
			app.restart();
			app.timer();
		},

		// shuffle the cards function
		shuffle: function () {
			var random = 0,
			 	temp   = 0;
			for(i=1; i < app.cards.length; i++){
				random = Math.round(Math.random() * i);
				temp   = app.cards[i];
				app.cards[i] 		= app.cards[random];
				app.cards[random] 	= temp;
			}
			app.assignCards();
		},

		// assigning the cards
		assignCards: function () {
			$('.card').each(function (index) {
				$(this).children('i').attr('class', app.cards[index]);
			});
			app.clickHandlers();
		},

		// click Event on the card
		clickHandlers: function () {
			$('.card').on('click', function () {
				$(this).addClass('selected open show test');
				setTimeout(() => { $(this).removeClass('open show'); }, 1000);
				app.checkUnmatched();
				app.checkMatch();
			});
		},

		// check if there is matching
		checkMatch: function () {
			if($('.selected').length == 2){
				if($('.selected').first().children('i').attr('class') == $('.selected').last().children('i').attr('class')){
					$('.selected').each(function(){
						$(this).addClass('match wow flash');
						new WOW().init();
						$(this).removeClass('unmatched');
						$('.moves').text($('.match').length / 2);
					});
				}
				$('.selected').each(function () {
					$(this).removeClass('selected');
				});
			}
		},

		// stars rating behavior 
		checkUnmatched: function () {
			if($('.test').length === 8 && $('.unmatched').length == 16 ) {
				$('.score-panel .stars').addClass('act8');
				$('.score-panel .stars i').eq(2).css('color', '#a1a1a1');
			}else if($('.test').length === 12 && $('.unmatched').length > 12 ){
				if($('.score-panel .stars').hasClass('act8')){
					$('.score-panel .stars i').eq(1).css('color', '#a1a1a1');
					$('.score-panel .stars').addClass('act12');
				}else{
					$('.score-panel .stars i').eq(2).css('color', '#a1a1a1');
					$('.score-panel .stars').addClass('act8')
				}
			} else if($('.test').length === 16 && $('.unmatched').length > 8 ){
				if($('.score-panel .stars').hasClass('act8 act12')){
					$('.score-panel .stars i').eq(0).css('color', '#a1a1a1');
					$('.score-panel .stars').addClass('act16')
				}else{
					$('.score-panel .stars i').eq(2).css('color', '#a1a1a1');
					$('.score-panel .stars').addClass('act8');
				}
			}
		},

		// fire up the pop on success
		checkWin: function () {
			if($('.unmatched').length === 0){
				$('#SuccessPopup').modal();
				app.checkRating();
			}
		},

		// restart the game
		restart: function () {
			$('.restart i, .modal .modal-footer button').on('click', function () {
				location.reload();
				showResult();
			});
		},

		//set the timer
		timer: function () {
  			$('.timer').text('1.00');
    		countDown = setInterval(app.decrementTime, 1000);
		},
		decrementTime: function () {
			if (timeLoss === 0) {
				$('.timer').text('1.00' + timeLoss);
     			clearInterval(countDown);
      			$('#failPopup').modal();
      			$('.card .overlay').css('display','block');
      			$('.forMoving').css("border", "none");
      			$('.stars, .moves').css("display", "none");
    		}
    		if (timeLoss < 10) {
      			$('.timer').text('0.0' + timeLoss).css('color', '#f00');
    		}
    		if (timeLoss >= 10) {
      			$('.timer').text('0:' + timeLoss);	
    		}
    		if($('.unmatched').length === 0){
      			clearInterval(countDown);
      			app.checkWin();
    		}
    		$('.modal-body p.failTime strong').text(timeLoss + " sec");
    		timeLoss--;
    		$('.modal-body p.time strong').text(59 - timeLoss + " sec");
    		$('#failPopup .modal-body p.movesCount strong').text($('.match').length / 2);
		},
		checkRating: function () {
			if($('.score-panel .stars').hasClass('act16')){
				$('.modal-body p.rating strong').text(0);
			}else if($('.score-panel .stars').hasClass('act12')){
				$('.modal-body p.rating strong').text(1);
			} else if($('.score-panel .stars').hasClass('act8')){
				$('.modal-body p.rating strong').text(2);
			} else{
				$('.modal-body p.rating strong').text(3);
			}
		}
	};
	app.init();

	// keyboard Controls
	var blocksPerRow = 4;

	$("body").on("keydown", function(e){
	    var thisIndex = $(".forMoving").index();
	    var newIndex = null;

	    // up key
	    if(e.keyCode === 38) {
	       newIndex = thisIndex - blocksPerRow;
	    }

	    // down key
	    else if(e.keyCode === 40) {
	        newIndex = thisIndex + blocksPerRow;       
	    }

	    // right key
	    else if(e.keyCode === 39) {
	        newIndex = thisIndex + 1;       
	    }

	    // left key
	    else if(e.keyCode === 37) {
	        newIndex = thisIndex - 1;       
	    }

	    // z key
	    else if(e.keyCode === 90) {
	        $('.forMoving').addClass("open show selected test");
	        setTimeout(() => { $('.forMoving').removeClass('open show'); }, 150);
	        app.checkUnmatched();
			app.checkMatch();     
	    }
	    if(newIndex !== null) { 
	        $(".card").eq(newIndex).addClass("forMoving").siblings().removeClass("forMoving");   
	    }    
	 });

	//  set the wow animation on click on the card
	$('.card').on('click', function () {
		$(this).addClass('wow zoomIn').siblings().removeClass('wow zoomIn');
		new WOW().init();
	})

	// Saving the records in the [local storage]

	// set the array
	var records = [];

	// on click event 
	$('button.btn-success').on('click', function (){

		// check if there is a value in the input field before registering
		if($('input[type="text"]').val() !== ""){
			var playerName = $('input[type="text"]').val();

			// an object to represents the result values
			var myObject = {
				name: playerName,
				time: 59 - timeLoss + " sec",
				rating: $('.modal-body p.rating strong').text()
			};

			// add the object of the result into the array
			records.push(myObject);

			// save the result in the localStorage
			localStorage['leaderboard']= JSON.stringify(records);

			// clear the input filed after registering
			playerName = $('input[type="text"]').val('');
			showResult();
		}
	});

	// a function to display the results 
	function showResult() {
			records = JSON.parse(localStorage['leaderboard']);
			$('#showRes').html('');

			function compare(a,b){
				var timeA = a.time;
				var timeB = b.time;

				if(timeA < timeB){
					return -1;
				}

				if(timeA > timeB){
					return 1;
				}
				return 0;
			}

			records.sort(compare);
			// for in loop to loop through the array of the objects
			for(n in records){
				$('#showRes').append("<tr><td>"+records[n].name+"</td><td>"+records[n].time+"</td><td>"+records[n].rating+"</td></tr>");
			}
		}
		showResult();
}); /* end of document ready function */
