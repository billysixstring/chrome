function fetch_feed() {
	chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'https://secure.diigo.com/api/v2/bookmarks?user=billysixstring&tags=read.later&count=100'}, 
		function(response) {
			display_stories(response);
		}
	);
}

function display_stories(feed_data) {

	var obj = $.parseJSON( feed_data );

	if ( obj.length > 0 ) {
	
		var links = [];
		$.each(obj, function(i, val) {
		
			var lnk = val.url;
			var title = val.title;
			var aId = "link" + i;
			links.push( '<li><a id="' + aId + '" href="#">' + title + '</a></li>');

			$("#"+aId).live( 'click', function() {
				openLink( lnk )
			});
		});
		
		$("#linkUL").append( links.join('') );
	}
}

function openLink( link ) {
	chrome.tabs.create({url: link});
}

$(document).ready(function() { fetch_feed(); });
