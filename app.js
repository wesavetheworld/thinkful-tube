var youTubeUrl = 'https://www.googleapis.com/youtube/v3/search';
var prevPageButton = ('<button class="prevPage" type="submit">' +
		'Previous</button>');
var nextPageButton = ('<button class="nextPage" type="submit">' +
		'Next</button>');


//retrieves data from YouTube
function getApiData(searchItem, callback, token) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyC65vVs3VxOP4s8DH92WGLYJd8zTc5qqlU',
		q: searchItem,
		pageToken: token,
		type: 'video'
	}
	$.getJSON(youTubeUrl, query, callback);
}

//displays YouTube data to DOM
function displayYouTubeResults(data) {
	var results = '';
	var pageQuery = $('.search-form').find('.query').val();

	//checks if sure returned any results
	if (data.items.length !== 0) {
		console.log(data);
		data.items.forEach(function(item) {
			results += '<p>' + item.snippet.title + '<br>' +
				'<a data-featherlight="iframe" href="https://www.youtube.com/embed/' + 
				item.id.videoId + '">' +
				'<img src="' + item.snippet.thumbnails.medium.url + '"></a><br>' +
				'<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" target="blank">Channel</a></p>';
		})
		//checks if there needs to be a previous page button and calls its function
		if (data.prevPageToken) {
			results += prevPageButton;
			prevPageListener(data.prevPageButton, pageQuery)
			}
		//checks if there needs to be a next page button and calls its function	
		if (data.nextPageToken) {
			results += nextPageButton;
			nextPageListener(data.nextPageToken, pageQuery);
			}
		}
	else {
		results += '<p>No results</p>';
		}
	$('.results').html(results);
	$('.results a').featherlight();
}

function prevPageListener(token, query) {
	$('.results').on('click', '.prevPage', function(e){
		getApiData(query, displayYouTubeResults, token);
	})	
}

function nextPageListener(token, query) {
	$('.results').on('click', '.nextPage', function(e){
		getApiData(query, displayYouTubeResults, token);
	})
}

function submitListener() {
	$('.search-form').submit(function(e) {
		e.preventDefault();
		var query = $(this).find('.query').val();
		getApiData(query, displayYouTubeResults);
	})
}

$(function() {
	submitListener();

})