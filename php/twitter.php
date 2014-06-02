<?php
/**
* @file
* User has successfully authenticated with Twitter. Access tokens saved to session and DB.
*/

/* Load required lib files. */
session_start();
require_once('twitteroauth.php');

define('CONSUMER_KEY', '');
define('CONSUMER_SECRET', '');
$access_token = '';
$oauth_token_secret = '';


//define('OAUTH_CALLBACK', $_SERVER['SERVER_NAME'].'code/twitter/php/twitter.php');
define('OAUTH_CALLBACK', 'http://localhost/code/twitter/php/twitter.php');


/* Get user access tokens out of the session. */
if($_SESSION['access_token']){
	$access_token = $_SESSION['access_token'];

}


/* Create a TwitterOauth object with consumer/user tokens. */
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token, $oauth_token_secret);

/* If method is set change API call made. Test is called by default. */
$content = $connection->get('account/verify_credentials');


$tweets = $connection->get('statuses/user_timeline', array('count' => '4'));

function output($tweets){
	return json_encode($tweets);
}

echo $_GET['callback'] . "(".output($tweets).");";

?>