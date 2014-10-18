<?php

	require_once('angler.php');

	$terms = $_GET['terms'];
	$terms = Angler::get_related_terms($terms);
	echo json_encode($terms);