#!/usr/bin/php
<?php

require './src/util.php';

// run app
leaf();

function leaf() {
    
    // Markdown Parser
    $Parsedown = new Parsedown();
        
    /*
        generate index.html  
    */
    ob_start();
    include_once("./src/index_template.php");
    $html = ob_get_clean();
    file_put_contents('./index.html', $html);

    // Get posts data
    $posts_data = array();
    $posts_path = scandir(get_path('post'));

    // Remove . & .. 
    // (only tested on Mac, don't know whether it is the same on Linux/Win)
    array_shift($posts_path);
    array_shift($posts_path);

    for ($i = 0, $l = count($posts_path); $i < $l; $i++) {
        $file_name = $posts_path[$i];
        $meta = spyc_load_file(get_path('post', $file_name));
        $article = $Parsedown->text(
            preg_replace('/^---\n*((.*:.*\n*)+)\n*---\n*/', '', file_get_contents(get_path('post', $file_name)))
        );

        $posts_data[] = array(
            'title' => $meta['title'],
            'time' => $meta['time'],
            'url' => preg_replace('/\.md$/', '', '#!/post/' . preg_replace('/\.md$/', '', $file_name)),
            'path' => get_path('data', preg_replace('/\.md$/', '', $file_name) . '.json'),
            'article' => $article
        );
    }

    // order posts by time
    $times = array();
    for ($i = 0, $l = count($posts_data); $i < $l; $i++) {
        $times[] = strtotime($posts_data[$i]['time']);
    }
    array_multisort($times, SORT_DESC, $posts_data);

    /*
        generate each post's json
    */
    for ($i = 0, $l = count($posts_data); $i < $l; $i++) {
        $post_data = $posts_data[$i];
        $file = fopen($post_data['path'], 'w');
        fwrite($file, json_encode($posts_data[$i]));
        fclose($file);
    }
    /*
        generate posts.json
    */
    $posts_data_clone = $posts_data;
    for ($i = 0, $l = count($posts_data_clone); $i < $l; $i++) {
        unset($posts_data_clone[$i][article]);
        unset($posts_data_clone[$i][path]);
    }
    $file = fopen(get_path('data', 'posts.json'), 'w');
    fwrite($file, json_encode($posts_data_clone));
    fclose($file);

    /*
        generate each page's json
    */
    $pages_path = scandir(get_path('page'));
    array_shift($pages_path);
    array_shift($pages_path);
    for ($i = 0, $l = count($pages_path); $i < $l; $i++) {
        $file_name = $pages_path[$i];
        $meta = spyc_load_file(get_path('page', $file_name));
        $article = $Parsedown->text(
            preg_replace('/^---\n*((.*:.*\n*)+)\n*---/', '', file_get_contents(get_path('page', $file_name)))
        );

        $page_data = array(
            'title' => $meta['title'],
            'url' => preg_replace('/\.md$/', '', '#!/' . $file_name),
            'path' => get_path('data', preg_replace('/\.md$/', '', $file_name) . '.json'),
            'article' => $article
        );
        
        $file = fopen($page_data['path'], 'w');
        fwrite($file, json_encode($page_data));
        fclose($file);
    }

}
