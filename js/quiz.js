(function() {
	quizInit();

})();

var currentQuestion, questionDiv, alternativeUl, rightAnswer, quizLength, okonomilappenJSON, score, progressionBar, progressString, lagProgressString;

function quizInit() {
	setObjects();
	getQuestion();
}

function setObjects() {
	currentQuestion = 0;
	questionDiv = $("#question");
	alternativeUl = $("#alternatives");
	progressionBar = $("#progressionBar");
	okonomilappenJSON = "../js/okonomilappen.json";
	score = 0;
	progressString = "";
	lagProgressString = true;
}

function answer(id) {
	if( "alt" + id === rightAnswer) {
		$( "#alt" + id ).css( "background-color", "rgb(46, 204, 113)" );
		score += 100;
	} else {
		$( "#alt" + id ).css( "background-color", "rgb(192, 57, 43)" );
	}
	$("#alternatives li").attr("onclick","");
	if(currentQuestion != quizLength - 1) {
		nextQuestion();
	} else {
		endOfQuiz();
	}
	
}

function endOfQuiz() {
	questionDiv.html(getResultText());
	alternativeUl.html("");
}
function getResultText() {
	var output = "<h2>Gratulerer du fikk " + score + " poeng</h2><p>";
	if( getMaxScore() > score ) { output += "Du mangler " + ( getMaxScore() - score ) 
		+ " poeng for full pott, <span style='cursor: pointer;' onclick='resetQuiz();'><b>prøv igjen!</b></span>" }
		else { output += "Det er full pott!" }
	output += "</p>";
	return output;
}
function resetQuiz() {
	score = 0;
	currentQuestion = 0;
	progressionBar.html("");
	getQuestion();
}
function getMaxScore() {
	return quizLength * 100;
}

function nextQuestion() {
	setTimeout(function() {
		currentQuestion++;
		alternativeUl.html("");
		progressionBar.html("");
		getQuestion();
	}, 800);
}
function createProgressString(value) {
	if(lagProgressString) {
		for (var i = 0; i <= value - 1; i++) {
			progressString += "<div id='pb" + i + "' class='progressBox'></div>";
		};
	}
	lagProgressString = false;
}

function getQuestion(){
	$.getJSON( okonomilappenJSON ).done( function( data ) {
		$.each( data.question, function( i, item ){
			
			if( i === 0 ) { 
				quizLength = data.question.length;
				createProgressString(quizLength);
			}

			//get current question number
			if( i === currentQuestion ) {
				progressionBar.html(progressString);

				//set current question id and text to questionText-div
				questionDiv.html("<p>Spørsmål " + (i + 1) + "</p><h2>" + item.text + "</h2>");

				$('#pb' + currentQuestion).addClass('progressActive');

				$.each( item.alt, function( a, alt){
					alternativeUl.append("<li id='alt" + a + "' onclick='answer(" + a + ");'>" + alt.text + "</li>");
					if(alt.value){ rightAnswer = "alt" + a }
				});
			}
		});
	});
}