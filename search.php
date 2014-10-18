<?php

class Angler {

	function get_google_results( $terms ) {
		if ( is_array( $terms ) ) {
			$terms = implode( '&', $terms );
		}
		$query = 'https://ajax.googleapis.com/ajax/services/search/news?q='.$terms.'&v=1.0';
		$results = self::curl_request( $query );
		$results = json_decode( $results );
		$results = $results->responseData->results;
		foreach ( $results as &$result ) {
			$result->link = $result->unescapedUrl;
			$result->headline = $result->title;
			$result->source = new stdClass();
			$result->source->name = $result->publisher;
			$url_parts = parse_url($result->link);
			$result->source->icon = 'http://'.$url_parts['host'].'/apple-touch-icon.png';
		}
		return $results;
	}

	function curl_request( $url ) {
		$ch = curl_init( $url );
		curl_setopt( $ch, CURLOPT_HEADER, 0 );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		$result = curl_exec( $ch );
		curl_close( $ch );
		return $result;
	}

	function get_social_stats( $link ) {
		$social = new stdClass();
		$social->facebook = self::get_social_stats_facebook( $link );
		$social->twitter = self::get_social_stats_twitter( $link );
		$social->score = rand(1, 100);
		return $social;
	}

	function get_social_stats_facebook( $link ) {
		$url = "https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='".$link."'&format=json";
		$result = self::curl_request( $url );
		$fb = json_decode( $result );
		return $fb[0]->total_count;
		return $fb;
	}

	function get_social_stats_twitter( $link ) {
		$url = 'http://urls.api.twitter.com/1/urls/count.json?url='.$link;
		$result = self::curl_request( $url );
		$twitter = json_decode( $result );
		return $twitter->count;
	}

}

$terms = $_GET['terms'];
$google_results = Angler::get_google_results( $terms );
foreach ( $google_results as &$gr ) {
	$gr->social = Angler::get_social_stats( $gr->link );
}
//print_r( $google_results );
echo json_encode( $google_results );
