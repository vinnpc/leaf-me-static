#!/usr/bin/php
<?php

require './src/util.php';

new_post();

function new_post() {

    global $argv;
    
    // title of new article
    array_shift($argv);
    $title = count($argv) > 0 ? implode(' ', $argv) : 'Untitled';
    
    $t = time();
    $path = get_path('post') . gmdate('Y-m-d', $t) . '-' . title2url($title) . '.md';
    $time = date('M d, Y H:i', $t);
    $init_content = <<<EOT
---
    
title: $title

time:  $time

---
EOT;

    $file = fopen($path, 'w');
    fwrite($file, $init_content);
    fclose($file);
}
