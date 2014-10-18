<?php
	require_once('loader.php');
	$context = array();
	$context['name'] = 'Grant';
	echo $twig->render('index.twig', $context);