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
	}

	function get_social_stats_facebook( $link ) {
		$url = "https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='".$link."'&format=json";

	}

}

$terms = $_GET['terms'];
$google_results = Angler::get_google_results( $terms );
foreach ( $google_results as &$gr ) {
	$gr->social = Angler::get_social_stats( $gr->link );
}
echo json_encode( $google_results );
