(function() {
	init();
})();

var menuWrap, mainContent, menuFlag, menuBtn;

function init() {
	setObjects();
	setEventHandlers();

	setHeight();
	setWidth();
	setPosition();
}

$( window ).resize(function() {
	setHeight();
	setWidth();
	setPosition();
});

function setObjects() {
	menuWrap = $( "#menuWrap" );
	mainContent = $( "#mainContent" );
	menuFlag = false;
	menuBtn = $( "#menuBtn" );
	Search = $( "#search" );
}

function setEventHandlers() {
	menuBtn.click(function(){
		toggleMenu();
	});
}
	

function setHeight() {
	menuWrap.height( window.innerHeight );
	mainContent.height( window.innerHeight );
}

function setWidth() {
	if( menuFlag ) {
		mainContent.width( window.innerWidth - menuWrap.width() );
	} else {
		mainContent.width( window.innerWidth );
	}
}

function setPosition() {
	if( menuFlag ) {
		menuWrap.css( "left", "0px" );
		mainContent.css( "left", menuWrap.width() + "px" );
	} else {
		menuWrap.css( "left", "-" + menuWrap.width() + "px" );
		mainContent.css( "left", "0px" );
	}
}

function toggleMenu() {
	if( menuFlag ) {
		menuFlag = false;
		setPosition();
	} else {
		menuFlag = true;
		setPosition();
	}
	setWidth();
}

