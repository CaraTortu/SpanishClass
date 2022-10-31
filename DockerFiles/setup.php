<?php

function AddUser($db, $username, $email) 
{
    // Account details
    $token = hash('sha256', rand(0, 1000000000).uniqid().time());

    // Generate password
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $shfl = str_shuffle($chars);
    $password = substr($shfl,0,16);

    // Echo the user and password for the user
    file_put_contents("/tmp/creds-".$username, "Your credentials are:\nUsername: " . $username . "\nPassword: " . $password . "\n");

    // Creates the account
    $r = $db->prepare("INSERT INTO users (username, password, email, verify_token, verified) VALUES (:user, :pass, :email, :token, 1);");
    $r->bindParam(':user', $username, PDO::PARAM_STR);
    $r->bindParam(':pass', hash("sha256", $password), PDO::PARAM_STR);
    $r->bindParam(':email', $email, PDO::PARAM_STR);
    $r->bindParam(':token', $token, PDO::PARAM_STR);
    $r->execute();

    # Set up progress file
    $filename = "/var/www/html/db/progress/" . hash("sha256", $username) . ".json";
    $file = fopen($filename, "w");
    fclose($file);

    $tmp_db = array();

    // Units
    for ($i = 1; $i<51; $i++) {
        for ($j = 1; $j<10; $j++) {
            $tmp_db[$i."-".$j] = "false";
        }
    }
    // Masterclasses
    $fileContent = file_get_contents("/var/www/html/db/json/masterclass.json");
    $decodeValues = json_decode($fileContent);
    foreach ($decodeValues as $key=>$val) {
        $tmp_db[$key] = "false";
    }

    // Write to DB
    file_put_contents($filename, json_encode($tmp_db));
}
// DB handler
$db = new PDO("sqlite:/var/www/html/db/class.db");

// Account details
$TestAccountUsername = "dev";
$TestAccountEmail = "dev@javier.ie";

// Add the user
AddUser($db, $TestAccountUsername, $TestAccountEmail);
