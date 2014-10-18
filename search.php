<?php

require_once('angler.php');

$terms = $_GET['terms'];
$google_results = Angler::get_google_results( $terms );
$max = 0;
foreach ( $google_results as &$gr ) {
	$gr->social = Angler::get_social_stats( $gr->link );
	$max = max( $max, intval( $gr->social->raw_total ) );
}
foreach ( $google_results as &$gr ) {
	$gr->social->score = 100 * ( $gr->social->raw_total / $max );
}
//print_r( $google_results );
echo json_encode( $google_results );
