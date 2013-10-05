//var city = $('li.current-user-city').html();
//var city = city.toLowerCase();
var city = 'seattle';
var espn = 'http://api.espn.com/v1/sports/soccer/usa.1/teams/links/web/';

// //GET TEAM ID
// $.ajax({
// 	url: espn,
// 	data: {
// 		apikey: '4u3e6enmscdszh8qcy9dh7my',
// 		_accept: "application/json"
// 	},
// 	dataType: "jsonp",
// 	beforeSend: function(xhr) {
// 		xhr.setRequestHeader("Accept", "application/json");
// 	},
// 	cache: false,
// 	type: "get"
// }).done(function(data) {
// 		$.each(data.sports[0].leagues[0].teams, function(index, team) {
// 					team_id = team.id;
// 					return this;
// 			});	return;
// 	});

// // GET INFO
// function find_team_info() {

// 	var espn_links;

// 	$.ajax({
// 		url: espn,
// 		data: {
// 			apikey: '4u3e6enmscdszh8qcy9dh7my',
// 			_accept: "application/json"
// 		},
// 		dataType: "jsonp",
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader("Accept", "application/json");
// 		},
// 		cache: false,
// 		type: "get"
// 	}).done(function(data) {

// 			console.log(team_id);
// 		$.each(data.sports[0].leagues[0].teams, function(index, team) {

// 			var team_name = team.name.toLowerCase();
// 			var team_location = team.location.toLowerCase();
// 			var team_id = team.id;

// 		// $('#my-teams * .team-feed header').append("<div class=feed-data>" + team_location + "</div>");
// 		// $("#my-teams * .feed-data:contains('" + city + "')").css("display", "block");
// 			$.each(team, function(index, info) {

// 				info2 = $(info);
// 				info2.slice(5, 7);

// 				$.each(info2, function(index, linkset) {
// 					$.each(linkset, function(index, set) {

// 						$.each(set, function(index, contents) {
// 							$.each(contents, function(index, espn_links) {
// 								$('<a class="espn-links" href='+espn_links+'><span class="hideme">'+espn_links+'</span>'+ team_name +' on ESPN</a>').appendTo('.team-feed nav');
// 								$("#my-teams * a:contains('usa.1')").remove();
// 								$("#my-teams * a:contains('" + city + "')").css("display", "block");
// 								$("#my-teams * br").remove();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	return;
// }

var my_team = $('.my-team').text();
var cap = 2;

//GET NEWS
function find_news() {
	$.ajax({
		url: 'http://api.espn.com/v1/sports/soccer/usa.1/news/headlines/',
		data: {
			apikey: "4u3e6enmscdszh8qcy9dh7my",
			_accept: "application/json",
			limit: 5
		},
		dataType: "jsonp",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
		},
		cache: false,
		type: "get"
	}).done(function(data) {
		$.each(data.headlines, function(index, article) {
			$('#ticker #js-headlines').append("<article><a href=" + article.links.web.href + ">" + article.title + "</a></article>");
			// $('#my-news .sleeve article').append("<div class=images>" + article.images+"</div>");
		});
	});
}

$("#banner").on("click", ".news-trigger", function(e) {
	e.preventDefault();
	$("#js-headlines article:first").nextAll().css('display', 'block');
	$("#js-headlines").toggleClass('exposed');
});

//change BG based on closest team

function location_based_view() {
	//if no primary team, use background for team closest
	var bg = $('.team-venue-image:first').text();
	//else use background for team chosen
	//$('body').css('background-image', 'url(' + bg + ')');
	$('#js-schedule').css('background-color', 'rgba(0,0,0,.60)');
	$('.team:first').addClass('primary');
	$('.team:first').after('<h5>A little farther away...</h5><div class="clearfix"></div>').nextAll().addClass('secondary');
}


function filter_schedule() {

	var today = moment().format("MM-DD-YYYY");

	// check MLS schedule
	$('.single-game').each(function() {

		//var game = $(this);
		//removes day of week for calc.	
		var game_date = moment($(this).children('.game-date').text()).format("MM-DD-YYYY");

		if (game_date < today) {

			//console.log("Before today: "+game_date);//game_date = "10-01-2013";
			var removable = $("#game-previews * .single-game:contains('" + my_team + "')").css('display','block');
			$(removable).remove();		
			//$(this).css('display', 'none');
		} 

		else if (game_date >= today) {

			//display ALL games that have my team
			$(".single-game:contains('" + my_team + "')").css('display','block');

			// this hid the score field if game is upcoming...but moved to CSS. Keeping for the moment though.
			//$(this).css({'color': '#363636'}).children('.game-score').css('display','none');

			//$(this):contains("'+ my_team +'")).parent().first().appendTo(".game-summary").css('display','block');
			
			//add to upcoming games (NEED TO ACCOUNT FOR HAVING A HUGE LIST AT BEG OF MO)
			$(this).filter(":contains('"+my_team+"')").appendTo("#upcoming-games");
		
			//grab the first from upcoming games
			var single_game = $('#game-previews * .single-game:first');

			//limits returned results (NEED TO ADD USER OPTION TO CHANGE CAP)			
			$('#upcoming-games').children().slice(cap);

			//add to next game
			$(single_game).filter(":contains('"+my_team+"')").prependTo('#next-game');

			//NEED TO LIMIT RESULTS TO XXXX 
			//additional, if today is gameday, displays the trigger and/or auto display the modal
			if (game_date == today) {
				$('.gameday-trigger').css('display', 'block');
			}
		}

		// id game type
		var game_type = $(this).children('.game-competition').text();
		switch (game_type) {
			case "MLS Regular Season":
				$(this).addClass('type-mls-reg');
				break;
			case "CCL":
				$(this).addClass('type-ccl');
				break;
			case "Open Cup":
				$(this).addClass('type-open');
				break;
				// case "Friendly":
				// 	$(this).addClass('type-friendly');
				// 	break;
			default:
				$(this).addClass('type-unknown');
		}

		// finally id the next game
		$(single_game).addClass('js-next-game').removeClass('type-mls-reg');
	})

	$(".schedule-trigger").click(function() {
	$('#upcoming-games').slideToggle('slow', function() {
	});
	
	$('#controls').fadeToggle('slow').click(function(){
		alert('click to run code that controls how many results displayed');
		$(this).css('color','yellow');
	});
});
}

function game_fields() {
	if (($('a.game-matchcenter') || $('a.game-tickets')).empty()) {
		$(this).css('display', 'none');
	}
	//channels
}

function sorting(){
//conditional display of tabs, depending on various situations
// if (($'section#schedule * .single-game')).has('.type-friendly'){
// 	$('ul.competitions li.type-friendly').show();
// }

$("li.type-all").click(function(){
	$("section#schedule * .single-game:contains('Seattle')").show();
});
$("li.type-mls-reg").click(function(){
	$("section#schedule * .single-game.type-mls-reg:contains('Seattle')").show();
	$("section#schedule * .single-game:contains('Seattle'):not('.type-mls-reg')").hide();
});
$("li.type-ccl").click(function(){
	$("section#schedule * .single-game.type-ccl:contains('Seattle')").show();
	$("section#schedule * .single-game:contains('Seattle'):not('.type-ccl')").hide();
});
$("li.type-open").click(function(){
	$("section#schedule * .single-game.type-open:contains('Seattle')").show();
	$("section#schedule * .single-game:contains('Seattle'):not('.type-open')").hide();
});
}

//triggers
$(".gameday-trigger").click(function() {
	$('#js-gameday').toggle();
});

var nbcsn="NBCSN"; 
var ch_nbcsn=nbcsn.match(/NBCSN/g);

var nbc="NBC"; 
var ch_nbc=nbc.match(/NBC/g);

var bein= "BEIN SPORT"; 
var ch_bein=bein.match(/BEIN SPORT/g);

var espn="ESPN"; 
var ch_espn=espn.match(/ESPN/g);

var mls="MLS LIVE"; 
var ch_mls=mls.match(/MLS LIVE/g);

$('a.game-tv:contains("'+ch_nbcsn+'")').filter(function() { 
	return $(this).text();
}).attr("href","http://www.nbcsports.com/tv-listings");

// $('a.game-tv:contains("'+ch_nbc+'")').filter(function() { 
// 	return $(this).text();
// }).attr("href","http://www.nbc.com");

$('a.game-tv:contains("'+ch_bein+'")').filter(function() { 
	return $(this).text();
}).attr("href","http://www.beinsport.tv");

$('a.game-tv:contains("'+ch_mls+'")').filter(function() { 
	return $(this).text();
}).attr("href","http://www.mlssoccer.com/liveeso");

$('a.game-tv:contains("'+ch_espn+'")').filter(function() { 
	return $(this).text();
}).attr("href","http://espn.go.com/watchespn/index");

$('a.game-tv:contains("TSN","UNIMAS,"RDS2")').removeAttr('href');

// $('a.game-tv').filter(function() { 
// 	return $(this).text() === $(/TSN/);
// }).attr("href","http://www.tsn.ca/");

// $('a.game-tv').filter(function() { 
// 	return $(this).text() === $(/UNIMAS/);
// }).attr("href","http://tv.univision.com/unimas/");


function switch_leagues() {
	$('.js-tabs').cycle({
		manualSpeed: 100
	});
}

// ON LOAD...
$(function() {
	location_based_view();
	//find_team_info();
	find_news();
	filter_schedule();
	game_fields();
	sorting();	
	switch_leagues();

});