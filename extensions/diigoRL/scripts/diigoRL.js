function fetch_feed( url, callback ) {

	var username = localStorage["diigoUsername"];
	var password = localStorage["diigoPassword"];

	if ( username && password ) {

		var xhr = createXhr( url, callback, username, password );
		xhr.send();
	}
	else {
		chrome.browserAction.setIcon( {path: "images/readlater-error.png" } );
		chrome.browserAction.setBadgeText( {text: '' } );
	}
}

function createXhr( url, callback, username, password ) {

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = xhr.responseText;
				callback(data);
			} else {
				callback(null);
			}
		}
	}

	var enc = $.base64.encode( username + ':' + password );

	// Note that any URL fetched here must be matched by a permission in
	// the manifest.json file!
	xhr.open('GET', url, true);
	xhr.withCredentials = true;			
	xhr.setRequestHeader( "Authorization", "Basic " + enc );

	return xhr;
}	

function displayCount(feed_data) {
	
	var obj = $.parseJSON( feed_data );
	var count = obj.length;
	
	if ( count > 0 ) {
		chrome.browserAction.setBadgeText({ text: count.toString() });
	}
	else {
		chrome.browserAction.setBadgeText({ text: '' });
	}
}

function onRequest(request, sender, callback) {
	if (request.action == 'fetch_feed') {
	  fetch_feed(request.url, callback);
	}
}

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);
document.addEventListener( 'DOMContentLoaded', function () {
  fetch_feed( 'https://secure.diigo.com/api/v2/bookmarks?user=billysixstring&tags=read.later&count=100', displayCount );
});