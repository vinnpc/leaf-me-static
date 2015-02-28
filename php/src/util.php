<?php

// little utilities

require 'vendor/autoload.php';

$config = spyc_load_file('config.yaml');

// set default timezone
date_default_timezone_set($config['timezone']);

function title2url($title) {
    return str_replace(' ', '-', strtolower($title));
}

function get_path($dir, $file = '') {
    global $config;
    if ($file) {
        return $config['path'][$dir] . '/' . $file;
    }
    return $config['path'][$dir] . '/' ;
}