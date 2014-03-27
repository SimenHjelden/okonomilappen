(function() {
	quizInit();

})();

var currentQuestion, questionDiv, alternativeUl, rightAnswer, quizLength, okonomilappenJSON, score;

function quizInit() {
	setObjects();
	getQuestion();
	setEventHandlers();
}

function setObjects() {
	currentQuestion = 0;
	questionDiv = $("#question");
	alternativeUl = $("#alternatives");
	okonomilappenJSON = "../js/okonomilappen.json";
	score = 0;
}
function setEventHandlers() {

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
	getQuestion();
}
function getMaxScore() {
	return quizLength * 100;
}

function nextQuestion() {
	setTimeout(function() {
		currentQuestion++;
		alternativeUl.html("");
		getQuestion();
	}, 800);
}

function getQuestion(){
	$.getJSON( okonomilappenJSON ).done( function( data ) {
		$.each( data.question, function( i, item ){
			
			if( i === 0 ) { quizLength = data.question.length }

			//get current question number
			if( i === currentQuestion ) {
				//set current question id and text to questionText-div
				questionDiv.html("<p>Spørsmål " + (i + 1) + "</p><h2>" + item.text + "</h2>");

				$.each( item.alt, function( a, alt){
					alternativeUl.append("<li id='alt" + a + "' onclick='answer(" + a + ");'>" + alt.text + "</li>");
					if(alt.value){ rightAnswer = "alt" + a }
				});
			}

		});
	});
}