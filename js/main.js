(function() {
	init();
})();

var menuWrap, mainContent, menuFlag, menuBtn;

function setObjects() {
	menuWrap = $( "#menuWrap" );
	mainContent = $( "#mainContent" );
	menuFlag = true;
	menuBtn = $( "#menuBtn" );
}

function init() {
	setObjects();
	settEventHandlere();
	setHeight();
	setWidth();
	setPosition();
}

$( window ).resize(function() {
	setHeight();
	setWidth();
});

function setPosition() {
	menuWrap.css( "left", "0px" );
	mainContent.css( "left", menuWrap.width() );
}

function setHeight() {
	menuWrap.height( window.innerHeight );
	mainContent.height( window.innerHeight );
}

function setWidth() {
	if(menuFlag) {
		mainContent.width( window.innerWidth - menuWrap.width() );
	} else {
		mainContent.width( window.innerWidth );
	}
	
}

function settEventHandlere() {
	menuBtn.click(function(){
		toggleMenu();
	});
}

function toggleMenu() {
	if(menuFlag) {
		menuFlag = false;
		menuWrap.css( "left", "-" + menuWrap.width() + "px" );
		mainContent.css( "left", "0px", "width" );
	} else {
		menuFlag = true;
		menuWrap.css( "left", "0px" );
		mainContent.css( "left", menuWrap.width() + "px" );
	}
	setWidth();
}