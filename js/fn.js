/*
	twitter api
 */

// Load the SDK's source Asynchronously
(function (d) {
	function loadScript(id,src){
		var js, ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = src;
		ref.parentNode.insertBefore(js, ref);
	}

	loadScript('tw-callback', 'php/twitter.php?callback=getTweets');
	loadScript('twitter-jssdk', '//platform.twitter.com/widgets.js');

}(document));

// Convert URLs @mentions, and #hashtags into anchor links
function twitterLinks(text)
{
    var base_url = 'http://twitter.com/';
    var hashtag_part = 'search?q=#';
    // convert URLs into links
    text = text.replace(
        /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
        function($0, $1, $2) {
            return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
        });
    // convert @mentions into follow links
    text = text.replace(
        /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
        function($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + $3
                + '" title="Follow ' + $3 + '" target="_blank">@' + $3
                + '</a>');
        });
    // convert #hashtags into tag search links
    text = text.replace(
        /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
        function($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3
                + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3
                + '</a>');
        });
    return text;
}

function getTweets(data){
	
	var output = '<ul>';

	$.each(data, function(key,val){


		 
		if(val.retweeted_status) {
			var tw = val.retweeted_status,
				type = 'retweet';
		}else{
			var tw = val,
				type = 'tweet';
		} 


			var user = tw.user,
				name = user.name,
				s_name = user.screen_name,
				p_profile = user.profile_image_url_https,
				text = twitterLinks(tw.text),
				created = tw.created_at;

			output +='<li class="'+type+'"><div class="imgBg" style="background-image:url('+p_profile+')"><a href="https://twitter.com/'+s_name+'" title="'+name+'"></a></div>';
			output +='<div><a href="https://twitter.com/'+s_name+'" title="'+name+'"><strong>'+name+'</strong> <span>@'+s_name+'</span></a>';
			output +='<p>'+text+'</p><span class="created_at">'+moment(created).fromNow();+'</span></div></li>';

	});

	output += '</ul>';
	output += '<div class="tw_follow"></div>';

	$('.twitter_posts').html(output);
	$('.tw_follow').html($('.twitter-follow-button'));

}