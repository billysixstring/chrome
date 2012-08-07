function init() {
	$("#diigoUsername").val( localStorage["diigoUsername"] );
	$("#diigoPassword").val( localStorage["diigoPassword"] );
}

function saveOptions() {

	var username = $("#diigoUsername").val();
	var password = $("#diigoPassword").val();
	
	localStorage["diigoUsername"] = username;
	localStorage["diigoPassword"] = password;

	$("#status").html( "Options saved." );	
}

$("#saveButton").live( 'click', function () {
	saveOptions();
} );

$(document).ready( function() {
	init();
});