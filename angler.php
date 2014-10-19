<?php

class Angler {

	static function get_google_results( $terms ) {
		if ( is_array( $terms ) ) {
			$terms = implode( '&', $terms );
		}
		$query = 'https://ajax.googleapis.com/ajax/services/search/news?q='.$terms.'&v=1.0&rsz=8';
		$results = self::curl_request( $query );
		$results = json_decode( $results );
		$results = $results->responseData->results;
		foreach ( $results as &$result ) {
			$result->link = $result->unescapedUrl;
			$result->headline = $result->title;
			$result->source = new stdClass();
			$result->source->name = $result->publisher;
			$url_parts = parse_url( $result->link );
			$result->source->icon = 'http://'.$url_parts['host'].'/apple-touch-icon.png';
		}
		return $results;
	}

	static function curl_request( $url ) {
		$ch = curl_init( $url );
		curl_setopt( $ch, CURLOPT_HEADER, 0 );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		$result = curl_exec( $ch );
		curl_close( $ch );
		return $result;
	}

	static function get_social_stats( $link ) {
		$social = new stdClass();
		$social->facebook = self::get_social_stats_facebook( $link );
		$social->twitter = self::get_social_stats_twitter( $link );
		$social->raw_total = $social->facebook + $social->twitter;
		return $social;
	}

	static function get_related_terms( $terms ) {
		$term_string = $terms;
		if ( is_array( $term_string ) ) {
			$term_string = implode( '&', $term_string );
		}
		$url = 'http://api.bing.com/osjson.aspx?query='.$term_string;
		$result = self::curl_request( $url );
		$f = count( $terms );
		$result = json_decode( $result );
		$result = $result[$f];
		$result = self::purify_related_terms( $terms, $result );
		return $result;
	}

	static function purify_related_terms( $search, $results ) {
		if (is_string( $serach )) {
			$search = implode('&', $search);
		}
		if (!is_array($search)) {
			$search = array($search);
		}
		$final_words;
		foreach ( $results as &$result ) {
			$words = explode(' ', $result);
			foreach($search as $s) {
				foreach($words as &$word) {
					if ($s != $word) {
						$final_words[] = $word;
					}
				}
			}
		}
		$final_words = array_unique( $final_words );
		return $final_words;
	}

	static function get_social_stats_facebook( $link ) {
		$url = "https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='".$link."'&format=json";
		$result = self::curl_request( $url );
		$fb = json_decode( $result );
		return $fb[0]->total_count;
		return $fb;
	}

	static function get_social_stats_twitter( $link ) {
		$url = 'http://urls.api.twitter.com/1/urls/count.json?url='.$link;
		$result = self::curl_request( $url );
		$twitter = json_decode( $result );
		return $twitter->count;
	}

}
