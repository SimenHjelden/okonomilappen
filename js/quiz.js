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
	if(currentQuestion != quizLength - 1) {
		nextQuestion();
	} else {
		endOfQuiz();
	}
	
}

function endOfQuiz() {
	questionDiv.html("<p>Gratulerer du fikk " + score + "poeng</p>");
	alternativeUl.html("");
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
				questionDiv.html("<p>Spørsmål " + i + "</p><h2>" + item.text + "</h2>");

				$.each( item.alt, function( a, alt){
					alternativeUl.append("<li id='alt" + a + "' onclick='answer(" + a + ");'>" + alt.text + "</li>");
					if(alt.value){ rightAnswer = "alt" + a }
				});
			}

		});
	});
}